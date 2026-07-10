
const express = require('express')

const app = express() 
const authRouter = require("../src/route/auth.route")
app.use(express.json()) // Middleware req.body data access kerne mai kaam aata hai
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use('/api/auth',authRouter)
module.exports = app