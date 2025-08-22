
//controllers//userController.js
import User from  '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()

const generateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:'7d'})
}
 
export  const ragisterUser=async (req,res)=>{
    try {
        const {name,email,password}=req.body;
        const userExists=await User.findOne({email})
        if(userExists){
            return res.status(400).json({message:"user already exixts"})
        }
        if(password.length<8){
             return res.status(400).json({success:false,message:"pasword min length 8 characters"})
    }
    const salt=await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(password,salt); 
    //CREATE USER
    const user=await User.create({
        name,
        email,
        password:hashedpassword
    })
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id)
    })
    }
    catch(error){
        res.status(500).json({
            message:"Servr error",
            error:error.message
        })

    }
}

export const loginUser=async (req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(500).json({message:"Invalid email or password"})
        }
        //compare the password
        const isMatch=await bcrypt.compare(password,user.password)
         if(!isMatch){
            return res.status(500).json({message:"Invalid email or password"})
        }
        res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id)
    })
    }
    catch(error){
              res.status(500).json({
            message:"Servr error",
            error:error.message
        })
    }
}
//GETUSER PROFILE FUCTION

export const getUserProfile=async (req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password")
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.json(user)
    }
    catch(error){
          res.status(500).json({
            message:"Servr error",
            error:error.message
        })
    }
}