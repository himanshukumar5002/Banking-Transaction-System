const express = require('express')

const router = express.Router()
const authController = require("../controller/auth.controller")


// end point create krna 

router.post('/register',authController.userRegisterController)
router.post('/login',authController.userLoginController)
module.exports = router