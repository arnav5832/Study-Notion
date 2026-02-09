const jwt = require("jsonwebtoken")
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async(req,res,next) =>{
    try{
        const authHeader = req.header("Authorization");
        const token = (req.cookies && req.cookies.token) || (req.body && req.body.token) || (authHeader ? authHeader.replace("Bearer ", "") : null);
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is Missing",
            })
        }
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"something went wrong while validating token"
        })
    }
}

//isStudent
exports.isStudent = async(req,res,next) =>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for student only"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"user role cant't be verified"
        })
    }
}

//isInstructor
exports.isInstructor = async(req,res,next) =>{
    console.log("2. Inside isInstructor Middleware");
    console.log("User Account Type:", req.user?.accountType);
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for Instructor only"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"user role cant't be verified"
        })
    }
}

//isAdmin
exports.isAdmin = async(req,res,next) =>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for Admin only"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"user role cant't be verified"
        })
    }
}


