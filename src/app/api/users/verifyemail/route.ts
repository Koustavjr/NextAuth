import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import { use } from "react";

export async function POST(request:NextRequest)
{
    try {
        
        const reqbody= await request.json();
        const {verifyToken}=reqbody;
        console.log(verifyToken);
        
        const user = await User.findOne({verifyToken:verifyToken,
            verifyTokenExpiry:{$gt:Date.now()}});

        if(!user)
            {
                return NextResponse.json({
                    message: "Invalid Token",
                    status:500
                },
            )
            }

            user.verifyToken=undefined;
            user.verifyTokenExpiry=undefined;
            user.isVerify=true;

            await user.save();

            return NextResponse.json({
                message:"user verified",
                status:200
            })

    } catch (error) {
        return NextResponse.json({
            message:"couldn't verify email"
        })
    }
}