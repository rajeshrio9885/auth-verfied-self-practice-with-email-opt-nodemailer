const User = require("../model/User");

const verifyResetCode = async(req,res,next)=>{
    try {
        const {code} = req.body;

        const user = await User.findOne({resetPasswordToken:code,resetPasswordExpiresAt:{$gt:Date.now()}})
       // console.log(user)
        if(!user){
            return res.status(400).json({
                error : "Invalid code or verification code is expired"
            })
        }
        user.save()
        req.user = user
        next()
    } catch (error) {
        console.log("error in verifyResetCode "+error)
    }
}

module.exports =verifyResetCode