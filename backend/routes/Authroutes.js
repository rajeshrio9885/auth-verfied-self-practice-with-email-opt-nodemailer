const express = require("express")
const { sigin, login, logout, verifyEmail, resetPassword, changePassword } = require("../controller/Authcontroller")
const verifyResetCode = require("../middleWare/verifyResetCode")

const Authrouter = express.Router()

Authrouter.post("/signin",sigin)
Authrouter.post("/login",login)
Authrouter.post("/logout",logout)
Authrouter.post("/verify-email",verifyEmail)
Authrouter.post("/reset-password",resetPassword)
Authrouter.post("/verify-reset",verifyResetCode,changePassword)
module.exports = Authrouter