const express = require("express")
const app = express()
const dotenv = require("dotenv")
const connectDB = require("./Db/ConnectDb")
const Authrouter = require("./routes/Authroutes")
const cors = require("cors")
const cookieParser = require("cookie-parser")
dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials:true}))

const port = process.env.PORT || 5000

app.use("/api/auth",Authrouter)

app.listen(port,()=>{
    console.log("port listen in 8000")
    connectDB()
})