
const express = require('express')
const app = express() 
app.use(express.json()) // Middleware req.body data access 
const cookieParser = require('cookie-parser')
app.use(cookieParser())


// Routes
const authRouter = require("../src/route/auth.route")
const accountRouter = require("../src/route/account.route")
const transactionRoutes = require("./route/transaction.route")

// Use routes
app.use('/api/auth',authRouter)
app.use('/api/accounts/',accountRouter)
app.use("/api/transactions", transactionRoutes)
module.exports = app