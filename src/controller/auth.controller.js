const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken")
const serviceEmail = require('../services/email.service')
/*
  -User register controller 
  -POST api/auth/register
  
*/

async function userRegisterController(req,res) {
       console.log(req.body)
       const {name,email,password} = req.body
       
       const IsExist = await userModel.findOne({
          email:email
       })
       if (IsExist) {
         return res.status(409).json({
         success: false,
         message: "User with this email already exists"
    });
  }

  const user =  await userModel.create({
      email, name , password
  })

  const token = jwt.sign({
      userId:user._id
  },process.env.JWT_SECRET_KEY,{
    expiresIn:"7d"
  })
  res.cookie("token",token)

  res.status(201).json({
    user:{
        _id:user._id,
        email:user.email,
        name:user.name
    },token
  })

  await serviceEmail.sendRegistrationEmail(user.email,user.name)
}
async function userLoginController(req,res) {
    const {email,password} = req.body 
    const user = await userModel.findOne({email})
     .select("+password");
    if(!user){
        return res.status(401).json({
            "message":"user with this email not exist"
        })
    }
    const IsvalidPassword = await user.comparePassword(password)

    if(!IsvalidPassword){
        return res.status(401).json({
            "message":"invalid password"
        })
    }

    const token = jwt.sign({
      _id:user._id
  },process.env.JWT_SECRET_KEY,{
    expiresIn:"7d"
  })
  res.cookie("token",token)

  res.status(200).json({
    user:{
        _id:user._id,
        email:user.email,
        name:user.name
    },token
  })

}

module.exports = {userRegisterController,userLoginController}