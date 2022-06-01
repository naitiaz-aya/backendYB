const User = require("../models/User");
const bcrypt = require("bcrypt");

//Update user
exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
};

//Delete user
exports.deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
};

//get user
exports.getUser = async (req, res) => {
	try{
		const user = await User.findById(req.params.id);
		const {password, updatedAt, ...other} = user._doc
		res.status(200).json(other);
	}catch(err){
		res.status(500).json(err);
	}
};

//get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log("ana hna");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

//follow user
exports.followUser = async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);
			if (!user.followers.includes(req.body.userId)) {
				console.log("ana hna");
			await user.updateOne({ $push: { followers: req.body.userId } });
			await currentUser.updateOne({ $push: { followings: req.params.id } });
			res.status(200).json("User has been followed");
		  } else {
			res.status(403).json("You allready follow this user");
		  }
		} catch (err) {
		  res.status(500).json(err);
		}
	  } else {
		res.status(403).json("You cant follow yourself");
	  }
};

//unfollow user
exports.unfollowUser = async (req, res) => {
	if (req.body.userId !== req.params.id) {
		
		try {
		  const user = await User.findById(req.params.id);
		  const currentUser = await User.findById(req.body.userId);
		  if (user.followers.includes(req.body.userId)) {
			await user.updateOne({ $pull: { followers: req.body.userId } });
			await currentUser.updateOne({ $pull: { followings: req.params.id } });
			res.status(200).json("User has been unfollowed");
		  } else {
			res.status(403).json("You dont follow this user");
		  }
		} catch (err) {
		  res.status(500).json(err);
		}
	  } else {
		res.status(403).json("You cant unfollow yourself");
	  }
};
