const router = require("express").Router()
const conversationController = require("../controllers/Conversation")

//create a conversation
router.post("/", conversationController.createConversation)
//get a conversation of a user
router.get("/:userId", conversationController.getConversation)
//get a conversation including 2 users
router.get("/find/:firstUserId/:secondUserId", conversationController.getConversationTwo)

//export the router
module.exports = router