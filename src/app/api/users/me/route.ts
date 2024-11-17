import { getDatafromToken } from "@/helpers/getDatafromToken";

import { NextRequest,NextResponse } from "next/server";

import User from "@/models/userModel";
import {connect} from "@/dbconfig/dbconfig"

connect()

export async function GET(request:NextRequest){
  try {
     const userId=await getDatafromToken(request)
     const user= await User.findOne({_id:userId}).select("-password")
     return NextResponse.json({message:"user found",data:user})
    
  } catch (error:unknown) {
    return NextResponse.json({error:"erro"},{status:400})
    
  }
}