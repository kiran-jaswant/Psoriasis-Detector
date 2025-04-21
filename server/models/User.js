import { Schema , model } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        errorMessage:"Name is required",
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlenght:20,
    },
    city:{
        type:String,
    },
},{
    timestamps:true, 
});

const User = model("User",userSchema);
export default User; 