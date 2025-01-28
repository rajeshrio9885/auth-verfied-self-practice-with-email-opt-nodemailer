const { transporter } = require("./nodemailer")
const User = require("../model/User")
const sendVerficationMail = async(email,otp)=>{
    try {
        const user = await User.findOne({email})
        await transporter.sendMail({
            from : process.env.SEND_EMAIL,
            to : email,
            subject : "Verification mail from rio site",
            text : `Hi ${user?.name || user},
    
    Thank you for signing up with Rajesh & co!
    
    To complete your registration and verify your email address, please use the One-Time Password (OTP) provided below:
    
    Your OTP: ${otp}
    
    This OTP is valid for the next 1 day. Please do not share this code with anyone for security purposes.
    
    If you did not request this verification, please ignore this email or contact us immediately at  nirmalvicky62@gmail.com.
    
    Thank you,
    Rajesh & co Team`
        })
    } catch (error) {
        
    }
   
}

module.exports = sendVerficationMail
