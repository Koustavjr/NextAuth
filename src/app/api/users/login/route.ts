import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest,NextResponse } from "next/server";

connect();

export async function POST(request:NextRequest)
{
    try {
        const reqBody = await request.json();
    const {email,password}=reqBody;

    const user= await User.findOne({email});

    if(!user)
    {
        return NextResponse.json({message:"User doesn't exists"},{status:400})
    }

    console.log('User exists');

    const validPassword = await bcryptjs.compare(password,user.password);
    console.log(validPassword);
    
    if(!validPassword)
    {
        return NextResponse.json({message:"Invalid Password"},{status:400})
    }

    console.log(user);

    const tokenData={
        id:user._id,
        email:user.email,
        username:user.username
    }
    
    const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'});
    
    const response= NextResponse.json({message:"Succesfully logged in!",
        success:true,

    });

    response.cookies.set("token",token,{
        httpOnly:true
    });

    return response;

    } catch (error) {
        return NextResponse.json({message:"error"});        
    }
}