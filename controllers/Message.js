const Message = require("../models/Message");

//create a message
exports.createMessage = async (req, res) => {
	const newMessage = new Message(req.body)
	try {
		const savedMessage = await newMessage.save()
		res.status(200).json(savedMessage)
	} catch (err) {
		res.status(500).json(err)
	}
}

// get all messages
exports.getAllMessages = async (req, res) => {
	try {
		const messages = await Message.find({
			conversationId: req.params.conversationId,
		  })
		res.status(200).json(messages)
	} catch (err) {
		res.status(500).json(err)
	}
}