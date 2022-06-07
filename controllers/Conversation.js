const Conversation = require("../models/Conversation");

// create a conversation
exports.createConversation = async (req, res) => {
	const newConversation = new Conversation({
		members: [req.body.senderId, req.body.receiverId],
	  });
	
	  try {
		const savedConversation = await newConversation.save();
		res.status(200).json(savedConversation);
	  } catch (err) {
		res.status(500).json(err);
	  }
};

// get a conversation of a user 
exports.getConversation = async (req, res) => {
	try {
		const conversation = await Conversation.find({
			members: {
				$in: [req.params.userId],
			},
		});
		res.status(200).json(conversation);
	} catch (err) {
		res.status(500).json(err);
	}
}

//get a conversation including 2 users
exports.getConversationTwo = async (req, res) => {
	try {
		const conversation = await Conversation.find({
			members: {
				$all: [req.params.userId, req.params.userId2],
			},
		});
		res.status(200).json(conversation);
	} catch (err) {
		res.status(500).json(err);
	}
}