const { transporter } = require("../config/nodemailer");
const sendVerficationMail = require("../config/nodeMailSend");
const generateCookie = require("../generateCookie/generatedCookie");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const sigin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Required all field",
      });
    }

    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return res.status(400).json({
        error: "User already exist",
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Enter correct email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be 6 character long",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verifyEmailToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const verifyEmailExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verifyEmailToken,
      verifyEmailExpiresAt,
    });
    await user.save();
    //generated cookie
    generateCookie(res, user._id);
    sendVerficationMail(email, verifyEmailToken);

    res.status(201).json({
      sucess: true,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in sigin controller : " + error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const verifyEmail = async(req,res)=>{
    try {
        const {code}  = req.body;
        const user = await User.findOne({verifyEmailToken:code})
        if(!user){
            return res.status(400).json({
                error : "Invalid or expired verification code"
            })
        }
        user.isVerified = true
        user.verifyEmailToken = undefined
        user.verifyEmailExpiresAt = undefined
        await user.save()
        res.status(200).json({
            message : "Verfication sucessfully"
        })
    } catch (error) {
        console.log("error in verify email "+error)
        return res.status(500).json({
            error : "Internal server error"
        })
       
    }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUser = await User.findOne({ email });

    if (!email || !password) {
      return res.status(400).json({
        error: "Providing all details",
      });
    }

    if (!isUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const isPassword = await bcrypt.compare(password, isUser.password);

    if (!isPassword) {
      return res.status(400).json({
        error: "Invalid creditinals",
      });
    }
    generateCookie(res, isUser._id);
    res.status(200).json({
      message: "login sucessfully",
    });
  } catch (error) {
    console.log("Error in login controller");
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const resetPassword = async(req,res)=>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                error : "user not found"
            })
        }
        const resetPasswordToken = Math.floor(
            100000 + Math.random() * 900000
          ).toString();
        const resetPasswordExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
        sendVerficationMail(email,resetPasswordToken)
        user.resetPasswordToken = resetPasswordToken
        user.resetPasswordExpiresAt = resetPasswordExpiresAt
        user.save()
        res.status(200).json({
            sucess : true,
            message : "Opt sent to email"
        })
    } catch (error) {
        console.log("error in resend "+error)
        res.status(500).json({
            sucess : false,
            error : "Internal server error"
        })
    }
}


const changePassword = async(req,res)=>{
    try {
        const {password,confirmPassword}=req.body
        const {user} = req

        const isUser = await User.findOne({email:user.email})

        if(!isUser){
            return res.status(400).json({
                error : "User not found"
            })
        }

        if(password.length < 6){
            return res.status(400).json({
                error : "password must be 6 character long"
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                error : "password must be same"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        isUser.password = hashedPassword
        isUser.resetPasswordExpiresAt = undefined
        isUser.resetPasswordToken = undefined
        isUser.save()

        res.status(200).json({
            message : "Password changed sucessfully"
        })
    } catch (error) {
        console.log("error in changePassword "+error)
        return res.status(500).json({
            error : "Internal server errror"
        })
    }
}

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "logout sucessfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = { sigin, login, logout,verifyEmail,resetPassword,changePassword};
