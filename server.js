require("dotenv").config();
const app = require('./src/app')
const connectToDB = require("./src/config/database")


const port = 3000

connectToDB()

app.listen(port,()=>{
    console.log("server is running on port 3000")
})

