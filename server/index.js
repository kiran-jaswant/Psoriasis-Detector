import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

 const app = express();
 app.use(express.json());
 app.use(cors());

 const connectDB = async()=>{
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    if (conn){
    console.log("MongoDB connected successfully");
    }
};


 app.get("/health",(req,res)=>{
    res.status(200).json({
        message:"server is running"
    })
 });

const PORT = process.env.PORT || 5002;
app.listen(PORT,()=>{
    console.log('server is running on port ${PORT}');
    connectDB()
});