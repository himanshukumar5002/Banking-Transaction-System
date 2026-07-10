const mongoose = require("mongoose")

async function connectToDB(){
      try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connect to DB")
      }
      catch(err){
         console.log(err.message)
         process.exit(1)
      }
}

module.exports = connectToDB