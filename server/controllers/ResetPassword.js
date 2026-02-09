const User = require("../models/User");
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt")
const crypto = require("crypto");

//resetpassToken
exports.resetPasswordToken = async(req,res) =>{
   try{
        const {email} = req.body;

        const user = await User.findOne({email: email});
        if(!user){
            return res.json({
                success:false,
                message:"kindly registered the email first"
            })
        };

        const token = crypto.randomUUID();
        const updatedDetails = await User.findOneAndUpdate(
                                        {email:email},
                                        {
                                            token:token,
                                            resetPasswordExpires:Date.now() + 5*60*1000,
                                        },
                                        {new:true})

        const url = `http://localhost:3000/update-passowrd/${token}`;

        await mailSender(email, "Password Rest Link", `Password reset link: ${url}`); 

        return res.json({
            success:true,
            message:"email sent successfully, pls check for reset pass and update it"
        })
   }
   catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "something went wrong while reset password"
        })
   }
}


//resetPassword
exports.resetPassword = async(req,res) =>{
    try{
        const {password, confirmPassword, token} = req.body;

        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"password not match with current password"
            })
        }

        const userDetails = await User.findOne({token:token});
        if(!userDetails){
            return res.json({
                success:false,
                message:"token is invalid"
            })
        }

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:"token is expired, pls try generate it again"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"password reset successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "something went wrong while reset password"
        })
    }
}