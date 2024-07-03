'use client'
import axios from 'axios'
import React, { useState } from 'react'
import {toast} from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  
  const [data,setData]=useState("nothing");
  const router=useRouter();

  const logout=async ()=>{
    try {
        await axios.get('api/users/logout');
        toast.success("Logged out")
        router.push('/login')
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message);
      
    }
  }
  
  const getUserData=async()=>{
    try {
      const res=await axios.get('api/users/me');
      console.log(res.data);
      setData(res.data.data._id);
      


    } catch (error:any) {
      console.log(error.message);
      
    }
  }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile page</h1>
      <hr />
      <h2>{data==="nothing"?"nothing":<Link href={`profile/${data}`}>{data}</Link>}</h2>     

      <hr />

      <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={logout}
      >Logout</button>
         <button className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      onClick={getUserData}
      >Get User Data</button>

      </div>
  )
}
