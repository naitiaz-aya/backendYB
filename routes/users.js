const router = require("express").Router()
const User = require("../models/User")
const userController = require("../controllers/User")

//Update user 
router.put("/:id", userController.updateUser)
//Delete user
router.delete("/:id",userController.deleteUser)
//get user 
router.get("/:id", userController.getUser)
//get all user 
router.get("/", userController.getAllUsers)
//follow a user 
router.put("/:id/follow", userController.followUser)
//unfollow a user
router.put("/:id/unfollow", userController.unfollowUser)

module.exports = router