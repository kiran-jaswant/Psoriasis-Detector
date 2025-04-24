import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { postSignup, postLogin} from "./controllers/user.js";

 const app = express();
 app.use(express.json());
 app.use(cors());

 const connectDB = async() => {
    const conn = await mongoose.connect(process.env.MONGODB_URL);

    if(conn){
        console.log("Mongodb is connected");
        } else {
            console.log("Mongoose connection failed");
        }
    };

 app.get("/health",(req,res)=>{
    res.status(200).json({
        message:"server is running"
    })
 });

 app.get("/",(req,res)=>{
    res.json({message:"hello from server"});
});

//-------Signup Api--------//
app.post("/signup", postSignup);

//-------Login Api--------//
app.post("/login", postLogin);
  

const PORT = process.env.PORT || 5002;
app.listen(PORT,()=>{
    console.log('server is running on port ${PORT}');
    connectDB()
});