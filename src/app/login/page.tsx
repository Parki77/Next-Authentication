"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";



export default function SignupPage(){

  const [user,setUser]=React.useState({
    email:"",
    password:"",
    


  })
  const route=useRouter()
  const onLogin=async ()=>{
    try{
      const response= await axios.post("/api/users/login",user)
      console.log(response.data)
      route.push("/profile")


    }
    catch(error:any)
    {
      console.log("error while login",error.message)
    }


  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white" >
      <h1>Login</h1>
      <hr />
      
      <label htmlFor="email">email</label>
      <input
      className="text-black"
      id="email" 
      type="text"
      value={user.email}
      onChange={(e)=>setUser({...user,email:e.target.value})} 
      placeholder="email"/>

     <label htmlFor="password">password</label>
      <input
      className="text-black"
      id="password" 
      type="text"
      value={user.password}
      onChange={(e)=>setUser({...user,password:e.target.value})} 
      placeholder="password"/>
      <hr />
      <button className="py-1 px-2 my-3 rounded-lg bg-gray-700
      "
      onClick={onLogin}> Login here</button>
      <Link href="/signup">visit sign page</Link>
    </div>
  )
}