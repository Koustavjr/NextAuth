import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


    export async function GET(request:NextRequest)
{
        try {
            const userId = getDataFromToken(request);

            const user= await User.findOne({_id:userId}).select("-password");
        
            if(!user)
                return NextResponse.json({
                    message:"Nothing to display!"
                })
        
                return NextResponse.json({
                    message:"User Found!",
                    data: user
                })         
        } catch (error) {
            return NextResponse.json({
                message:"Check token"
            })   
        }
   
}

