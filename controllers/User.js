const User = require("../models/User")
const bcrypt = require("bcrypt")

//Update user
exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
      } catch (err) {
        return res.status(500).json(err)
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      })
      res.status(200).json("Account has been updated")
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    return res.status(403).json("You can update only your account!")
  }
}

//Delete user
exports.deleteUser = async (req, res) => {
	  if (req.body.userId === req.params.id || req.body.isAdmin) {
		try{
			await User.findByIdAndDelete(req.params.id)
			res.status(200).json("Account has been deleted")

		}
		catch(err){
			res.status(500).json(err)
		}
	  } else {
		return res.status(403).json("You can delete only your account!")
	  }

	}

//get user
exports.getUser = async (req, res) => {
	try{
		const userId = req.query.userId
		const {password,updatedAt, ...other} = await User.findById(userId)
		res.status(200).json(other)
	}catch(err){
		res.status(500).json(err)
	}
}

//get all users
exports.getAllUsers = async (req, res) => {
	try{
		const users = await User.find()	
		res.status(200).json(users)
	}catch(err){
		res.status(500).json(err)
		res.send("ayaaa")
	}
}

//follow user
exports.followUser = async (req, res) => {
	if (req.body.userId === req.params.id ) {
		try{
			const user = await User.findById(req.params.id)
			const currentUser = await User.findById(req.body.userId)
			if (!user.followers.includes(req.body.userId)) {
				await user.updateOne({ $push: { followers: req.body.userId } })
				await currentUser.updateOne({ $push: { following: req.params.id } })
				res.status(200).json("You are now following this user")
			} else {
				res.status(200).json("You are already following this user")
			}
		}catch(err){
			res.status(500).json(err)
		}
	} else {
		return res.status(403).json("You can't follow yourself !")
	}
}

//unfollow user
exports.unfollowUser = async (req, res) => {
	if (req.body.userId === req.params.id ) {
		try{
			const user = await User.findById(req.params.id)
			const currentUser = await User.findById(req.body.userId)
			if (user.followers.includes(req.body.userId)) {
				await user.updateOne({ $pull: { followers: req.body.userId } })
				await currentUser.updateOne({ $pull: { following: req.params.id } })
				res.status(200).json("You are no longer following this user")
			} else {
				res.status(200).json("You are not following this user")
			}
		}catch(err){
			res.status(500).json(err)
		}
	} else {
		return res.status(403).json("You can't unfollow yourself !")
	}
}

