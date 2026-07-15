const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:[true,"this email is already exist"],
        lowercase:true,
        trim:true,
        match: [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/]
    },
    name:{
        type:String,
        required:[true,"name is required"]
     
    },
    password:{
        type:String,
        required:[true,"password id required"],
        minlength:[6,"min leng must be 6 "],
        select:false
    },
    systemUser:{
        type:Boolean,
        default:false,
        immutable:true,
        select:false
    }
},  {   timestamps:true 
       }
)

//const bcrypt = require("bcrypt");

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return ;
  }

  this.password = await bcrypt.hash(this.password, 10);

});

userSchema.methods.comparePassword  = async function(password){
    return await bcrypt.compare(password,this.password)
}

userModel = mongoose.model("users",userSchema);

module.exports = userModel 