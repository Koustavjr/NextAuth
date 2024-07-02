import User from '@/models/userModel'
import { NextResponse,NextRequest } from 'next/server'
import bcryptjs from 'bcryptjs'
import {connect} from '@/dbConfig/dbConfig'
import {sendEmail} from '@/helpers/mailer'

connect()

export async function POST(request:NextRequest)
{
   try {
    const reqBody= await request.json();
    console.log(reqBody);
    
    const {username,email,password}=reqBody;

    const user= await User.findOne({email});
    if(user)
        {
            return NextResponse.json({message:"User already exists!"},{status:400})
            
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);
        
        const newUser= new User({
            username,
            email,
            password:hashedPassword
        })
        
        
        const savedUser=await newUser.save();
        console.log(savedUser);
        
        // todo: email send
        const userId=savedUser._id;
      await  sendEmail({email,emailType:'VERIFY',userId});

        return NextResponse.json({
            message:"user saved successfully!",
           success:true,
           savedUser 
        });

   } catch (error:any) {
        return NextResponse.json({
            message:error.message,
            status:500,
        })   
   }
}