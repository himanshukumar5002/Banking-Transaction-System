const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const AccountController = require('../controller/account.controller')

// Acount create api 
// Post /api/account
// //router.post("/", (req, res) => {
//     console.log("Account route hit");
//     res.send("OK");
// });
router.post('/',authMiddleware.authMiddleware,AccountController.createAccountController)

module.exports = router 