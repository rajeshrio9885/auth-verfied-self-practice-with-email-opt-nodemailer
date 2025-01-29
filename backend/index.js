const express = require("express")
const app = express()
const dotenv = require("dotenv")
const connectDB = require("./Db/ConnectDb")
const Authrouter = require("./routes/Authroutes")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const path = require("path")
const _dirname = path.resolve()
app.use(cors({
    origin : "*",
    credentials:true
}))
app.use(express.urlencoded({
    extended : true
}))
app.use(cookieParser()) 
dotenv.config()
app.use(express.json())



const port = process.env.PORT || 5000

app.use("/api/auth",Authrouter)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(_dirname,"/client/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(_dirname,"client","dist","index.html"))
    })
}


app.listen(port,()=>{
    console.log("port listen in 8000")
    connectDB()
})