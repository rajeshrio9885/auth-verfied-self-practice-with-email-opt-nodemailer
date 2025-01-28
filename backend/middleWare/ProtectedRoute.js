const jwt = require("jsonwebtoken")

const protectedRoutes = async(req,res,next)=>{
    try {
        const {token} = req.cookies
        if(!token){
            return res.status(401).json({
                error : "Not authorised token"
            })
        }

        const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(!decode){
            return res.status(401).json({
                error : "Not authorised token"
            })
        }

        req.userId = decode.userId
        next()

    } catch (error) {
        console.log("error "+error)
        return res.status(500).json({
            error : "Internal server error"
        })
    }
}

module.exports = protectedRoutes