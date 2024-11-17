import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";


export const getDatafromToken=(request:NextRequest)=>{
  try {
    const token= request.cookies.get("token")?.value||" "
    const decodedToken=jwt.verify(token,process.env.SECRET_KEY!)as JwtPayload;
    return decodedToken.id
    
  } catch (error) {
    console.error("Error during login:", error);

    // return NextResponse.json(
    //   { error: "Unexpected error has occurred" },
    //   { status: 500 }
    // );
  }

}