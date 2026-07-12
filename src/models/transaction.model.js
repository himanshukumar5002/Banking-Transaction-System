const mongoose = require('mongoose')


const transactionSchema = new mongoose.Schema({
    fromAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"Transaction must be assosiate with a from Account"],
        index:true
    },
    toAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"Transaction must be assosiate with a to Account"],
        index:true
    },
    status:{
        type:String,
        enum:{
            values:["COMPLETE","FAILED",'PENDING',"REVERSED"]
        },
        default:"PENDING"
    },
    amount:{
        type:Number,
        required:[true,"amount is required for a transaction"],
        min:[0,"min is 0"]
    },
    idempotencyKey:{
        type:String,
        unique:true,
        required:[true,"key is required"],
        index:true
    }

},{
    timestamps:true
})

const transactionModel = mongoose.model("Transaction",transactionSchema)
module.exports = transactionModel