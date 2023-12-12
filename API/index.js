import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./Routets/authRoutes.js"
import hotelsRoute from "./Routets/hotelsRoutes.js"
import roomsRoute from "./Routets/roomsRoutes.js"
import usersRoute from "./Routets/usersRoutes.js"
import cookieParser from "cookie-parser";
const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connect to MongoDB")
    } catch (error) {
        throw error
        console.log(" Not connect to MongoDB")
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected")
})

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/users", usersRoute)

app.use((err,req,res,next) =>{
    const errorStatus = err.status || 500;
    const errorMessage = err.status || "Something went wrong";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})

app.listen(8800, () => {
    connect()
    console.log("connected to Backend.")
})