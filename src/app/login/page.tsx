'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {toast} from 'react-hot-toast'

export default function Loginpage() {
  
    const router =  useRouter();
    const[user,setUser]= useState({
        email:"",
        password:""
    });

    const [Loading,setLoading]=useState(false);
    const [buttonDisabled,setButtonDisabled]=useState(false);

    const onLogin=async ()=>{
        try {
            setLoading(true);
            const response= await axios.post('api/users/login',user);
            console.log(response);
            router.push('/profile');


        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if( user.email.length>0 && user.password.length>0)
            {
                setButtonDisabled(false);
            }
        else
        {
            setButtonDisabled(true);
        }
    },[user])
  
    return (
    <div className='flex flex-col items-center justify-center p-2 min-h-screen'> 
    <h1>{Loading?'processing':'Log in'}</h1> 
    <hr /> 
     <label htmlFor="email">email</label>
    <input 
     className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
    type="text" 
    value={user.email}
    placeholder='email'
    id='email'
    onChange={(e)=>setUser({...user,email:e.target.value})}
    />   
     <label htmlFor="password">password</label>
    <input 
     className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
    type="password" 
    value={user.password}
    placeholder='password'
    id='password'
    onChange={(e)=>setUser({...user,password:e.target.value})}
    />   

    <button
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 rounded-md"
    onClick={onLogin}
    >{buttonDisabled?'no Login':'Login'}</button>
    <Link href="/signup">Visit Signup Page</Link>
    </div>
    
  )
}
