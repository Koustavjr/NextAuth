import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";


export const getDataFromToken= (request:NextRequest)=>{

    const encodedToken = request.cookies.get("token")?.value || "";
    const decodedToken:any = jwt.verify(encodedToken,process.env.TOKEN_SECRET!);

    return decodedToken.id;


} 

