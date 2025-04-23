import User from "./../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const postSignup = async(req,res)=>{
    const { name, email, password, city} = req.body;
 
    if(!name){
     return res.status(400).json({
         message:"Name is required",
         data:null,
         success: false,
     });
    }
 
    if(!email){
     return res.status(400).json({
         message:"Email is required",
         data:null,
         success: false,
     });
    }
 
    if(!password){
     return res.status(400).json({
         message:"Password is required",
         data:null,
         success: false,
     });
    }
  
    const encryptedPassword = await bcrypt.hash(password, 10);//pw is encrypted here
 
    const newUser = new User({
     name,
     email,
     password: encryptedPassword,
     city,
    });
 
    try {
       const savedUser = await newUser.save();
       savedUser.password = undefined; //Remove password from the response
 
       return res.status(201).json({
         message:"Signup Successful",
         data: savedUser,
         success: true
       });
    } catch (error) {
        res.status(400).json({
         message: error.message,
         data: null,
         success:false,
     });
    }
 
    return res.status(201).json({
     message: "Signup successful",
     data: savedUser,
     success: true,
    });
 };
 

 const postLogin = async(req,res)=>{
    const {email,password}= req.body;

    const user= await User.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"Invalid email or password",
            data:null,
            success:false,
        });
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password",
            data:null,
            success:false,
        });
    }

    user.password = undefined; //remove password from the response

const jwtToken = jwt.sign(
  {
    _id: user._id,
    name: user.name,
    email: user.email,
  },
    process.env.JWT_SECRET,
    { expiresIn:60*60*24 }
);


    if(user){
        return res.status(200).json({
            message:"Login Successful",
            data:user,
            jwtToken:jwtToken,
            success: true,
        });
    } else {
        return res.status(400).json({
            message:"Invalid email or password",
            data:null,
            success:false,
        })
    }
}

export {postSignup,postLogin};