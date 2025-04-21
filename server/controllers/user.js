import User from "./../models/User.js"

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

   const newUser = new User({
    name,
    email,
    password,
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

    const user= await User.findOne({
        email,
        password
    }).select("-password -__v")//it will neglect pw<-    //or to add("name email _id")
    if(user){
        return res.status(200).json({
            message:"Login Successful",
            data:user,
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