const mongoose = require("mongoose")

const connectDB = async()=>{
    try {
       const response =   await mongoose.connect(process.env.MONGODB_URI)
        console.log("Db connected sucessfully "+response.connection.host)
    } catch (error) {
        console.log(" error " +error.message)
    }
}

module.exports = connectDB