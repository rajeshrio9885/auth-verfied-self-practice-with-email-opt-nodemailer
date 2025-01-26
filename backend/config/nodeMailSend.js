const { transporter } = require("./nodemailer")

const sendVerficationMail = async(email,opt)=>{
    await transporter.sendMail({
        from : process.env.SEND_EMAIL,
        to : email,
        subject : "Verification mail from rio site",
        text : "You have sign in the website.Your OPT is "+opt
    })
}

module.exports = sendVerficationMail
