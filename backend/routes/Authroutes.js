const express = require("express")
const { sigin, login, logout, verifyEmail, resetPassword, changePassword, checkRoutes } = require("../controller/Authcontroller")
const verifyResetCode = require("../middleWare/verifyResetCode")
const protectedRoutes = require("../middleWare/ProtectedRoute")

const Authrouter = express.Router()
 
Authrouter.post("/signin",sigin)
Authrouter.post("/login",login)
Authrouter.post("/logout",logout)
Authrouter.post("/verify-email",verifyEmail)
Authrouter.post("/reset-password",resetPassword)
Authrouter.post("/verify-reset",verifyResetCode,changePassword)
Authrouter.get("/getUser",protectedRoutes,checkRoutes)
module.exports = Authrouter