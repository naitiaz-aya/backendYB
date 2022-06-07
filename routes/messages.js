const router = require("express").Router()
const messageController = require("../controllers/Message")

//create a message
router.post("/", messageController.createMessage)
//get all messages
router.get("/:conversationId", messageController.getAllMessages)

module.exports = router