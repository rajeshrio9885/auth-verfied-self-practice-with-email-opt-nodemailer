const express = require("express")
const app = express()
const dotenv = require("dotenv")
const connectDB = require("./Db/ConnectDb")
const Authrouter = require("./routes/Authroutes")
const cors = require("cors")
const cookieParser = require("cookie-parser")
app.use(cors({
    origin : "http://localhost:5173",
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

app.listen(port,()=>{
    console.log("port listen in 8000")
    connectDB()
})