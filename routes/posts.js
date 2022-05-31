const router = require("express").Router()
const postController = require("../controllers/Post")

//create a post
router.post("/",postController.createPost)
//update a post 
router.put("/:id", postController.updatePost)
//delete a post 
router.delete("/:id", postController.deletePost)
//like a post 
router.put("/:id/like",postController.likePost)
//get a post 
router.get("/:id", postController.getPost)
//get timeline posts 
router.get("/timeline/:userId", postController.getTimelinePosts)

module.exports = router