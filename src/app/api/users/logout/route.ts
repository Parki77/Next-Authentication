import {  NextResponse } from "next/server";

export async function GET(){
  try {
    const response=NextResponse.json({message:"logout sucesssfull",sucess:"true"},{status:200})
    response.cookies.set("token","",{expires:new Date(0)})
    return response
    
  } catch (error:unknown) {
    return NextResponse.json({error:"error"},{status:400})
    
  }
}