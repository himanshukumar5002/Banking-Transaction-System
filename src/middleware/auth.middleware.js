const userModel = require('../models/user.model')

const jwt = require('jsonwebtoken')


async function authMiddleware(req,res,next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if(!token){
        return res.status(401).json({
            message:"unauthrized access,token is missing"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

console.log("========== AUTH MIDDLEWARE ==========");
console.log("Token Payload:", decoded);
console.log("User ID from Token:", decoded.userId);

const user = await userModel.findById(decoded.userId);

console.log("User Found in Database:", user);

if (!user) {
    console.log(" User not found in database");
    return res.status(401).json({
        message: "User not found"
    });
}

req.user = user;

console.log("req.user assigned successfully");
console.log("req.user._id:", req.user._id.toString());
console.log("req.user.email:", req.user.email);
console.log("====================================");

next();
    }
    catch(err){
      return res.status(401).json({
        message:"Invalid token"
      })
    }
}

module.exports = {authMiddleware }