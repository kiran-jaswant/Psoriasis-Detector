import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
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

app.get("/dashboard", async (req, res)=>{
    const {authorization} = req.headers;
    try{
    //authorization = "Bearer ABC123"
       const jwtToken = authorization.split(" ")[1];//Space hatake 1 no vala token
       console.log("JWT Token:",jwtToken);
       const decodedToken = jwt.verify(jwtToken,process.env.JWT_SECRET);
       console.log("decoded token:",decodedToken);
    } catch (error){
        return res.status(401).json({
            message:`Unauthorized: ${error.message}`,
            success:false,
        });
    }

    const blogs = [
        {
            title:"Blog 1",
            content:"This is the content of blog 1"
        },
        {
            title:"Blog 2",
            content:"This is the content of blog 2"
        }
    ];

    res.json({
        message:"dashboard fetched successfully",
        data:blogs,
        success:true,
    });
})


const PORT = process.env.PORT || 5002;
app.listen(PORT,()=>{
    console.log('server is running on port ${PORT}');
    connectDB()
});