import { verify } from "crypto";
import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
  username:{
    type:String,
    // required:[true,"Please provide a username"],
    unique:true
  },
  email:{
    type:String,
    required:[true,"Please provide a email"],
    unique:true
  },
  password:{
    type:String,
    required:[true,"please provide a password"]

  },
  isVarified:{
    type:Boolean,
    default:false
  },
  isAdmin:{
    type:Boolean,
    default:false,
  },
  forgotPasswordToken:String,
  forgotPasswordTokenExpire:Date,
  verifyToken:String,
  verifyTokenExpire:Date,


})
const User=mongoose.model.users || mongoose.model("User",userSchema)

export default User;