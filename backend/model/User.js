const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true,
        minlength : 6
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    lastLogIn : {
        type : Date,
        default : Date.now
    },
    resetPasswordToken : String,
    resetPasswordExpiresAt :Date,
    verifyEmailToken : String,
    verifyEmailExpiresAt:Date

},{timestamps:true})

const User = mongoose.model("user",UserSchema)

module.exports = User
