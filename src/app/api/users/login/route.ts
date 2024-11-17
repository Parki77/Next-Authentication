import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

connect()

export async function POST(request:NextRequest) {
  try{
    const reqbody= await request.json()
    const {email,password}=reqbody
   const user= await User.findOne({email})
   if(!user)
   {
    return NextResponse.json({message:"User doesnot exist"},{status:400})
   }
  const correctpass= await bcryptjs.compare(password,user.password)
  if(!correctpass)
  {
    return NextResponse.json({message:"Password incoreccet"},{status:400})
  }
  const tokenData={
    id:user._id,
    email:user.email,
    username:user.username
  }
  const token=jwt.sign(tokenData,process.env.SECRET_KEY!,
    {expiresIn:"1d"})

   const response=NextResponse.json({message:"Login successfull",sucess:true},{status:200})
   response.cookies.set("token", token, { httpOnly: true });
   return response


  }
  
  catch (error) {
    console.error("Error during login:", error);

    return NextResponse.json(
      { error: "Unexpected error has occurred" },
      { status: 500 }
    );
  }
  
  
}
