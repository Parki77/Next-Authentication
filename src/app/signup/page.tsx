"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";



export default function SignupPage(){
  const router=useRouter();

  const [user,setUser]=React.useState({
    email:"",
    password:"",
    username:""


  })

  const [buttonDisable,setButtonDisable]=React.useState(false)
  const onSignup=async ()=>{
    try{
     const response= await axios.post("/api/users/signup",user)
     console.log("signup success",response.data);
     router.push("/login")

    }
    catch(error:any)
    {
      console.log(error.message)
       }


  }

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length>0)
    {
      setButtonDisable(false)
    }
    else{
      setButtonDisable(true)
    }

  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white" >
      <h1>signup</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input className="text-black"
      
      id="username" 
      type="text"
      value={user.username}
      onChange={(e)=>setUser({...user,username:e.target.value})} 
      placeholder="username"/>
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
      onClick={onSignup}>{buttonDisable?"no Signup":"signup"}</button>
      <Link href="/login">visit login page</Link>
    </div>
  )
}