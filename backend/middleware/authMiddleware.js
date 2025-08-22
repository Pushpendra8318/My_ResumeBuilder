//middleware//authMiddleware.js
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()

export const protect = async (req,res,next)=>{
    try {
        let token=req.headers.authorization;

        if(token&& token.startsWith("Bearer")){
            token=token.split(" ")[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            req.user=await User.findById(decoded.id).select("-password")
            next();
        }
        else {
            res.status(401).json({message:"NOT AUTHORIZED"})
     }

    }
    catch(error){
         res.status(401).json({message:"token failed",error:error.message})
    }
}