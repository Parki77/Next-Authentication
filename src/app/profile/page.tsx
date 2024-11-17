"use client"

import { useRouter } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react"
import Link from "next/link"
export default function ProfilePage(){
  const [data,setData]=useState("nothing")

  const route=useRouter()
  const logout=async ()=>{
    try {
       await axios.get("/api/users/logout")
       route.push("/login")

      
    } catch (error:unknown) {
      console.log(error)
      
    }
  }
  const getUserDetails= async ()=>{
    const res= await axios.get("/api/users/me")
    console.log(res.data)
    setData(res.data.data._id)
  }
  useEffect(() => {
    if (data !== "nothing") {
      route.push(`/profile/${data}`);
    }
  }, [data, route]);
  
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>
        profile
      </h1>
      <hr />
      <p>Profile page</p>
      <h2>{data==="nothing"?"nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button
      className="bg-blue-600 rounded-lg text-sm"
      onClick={logout}
      > logout</button>

<button
      className="bg-green-600 rounded-lg text-sm"
      onClick={getUserDetails}
      > GetUser</button>
      
    </div>
  )
}