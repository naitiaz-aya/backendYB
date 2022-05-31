const router = require("express").Router()
const authController = require('../controllers/Auth');

//Register 
router.post("/register", authController.register);
//Login
router.post("/login", authController.login);

module.exports = router