import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../../../db/models/user.model.js'
import handleAsyncError from '../../utilis/handleAsyncError.js'
import sendOurMail from '../../utilis/sendOurMail.js'
import sendResetMail from '../../utilis/sendResetMail.js'
export const signUp=handleAsyncError(async(req,res)=>{
    let {userName,email,password,Cfpassword,Address}=req.body
    let founded = await userModel.findOne({email},{})
    if(founded)
    {
        return res.json({message:"user is already exist"})
    }
    let hashedPassword=bcrypt.hashSync(password,10)
    let addUser=await userModel.insertMany({userName,email,password:hashedPassword,Address})
    let token=jwt.sign({id:addUser[0]._id},"VERIFYACCOUNT")
    sendOurMail({email,url:`http://localhost:3000/user/verify/${token}`})
    res.json({message:"added done",addUser})

})
export const verify= handleAsyncError(async(req,res)=>{
    jwt.verify(req.params.token,"VERIFYACCOUNT",async (error,decoded)=>{
        if(error) return res.json("invalid token")
        let updatedUser=await userModel.findByIdAndUpdate(decoded.id,{isVerify:true},{new:true})
        res.json({message:"Hello",updatedUser})
    })
})
export const signIn=handleAsyncError(async(req,res)=>{
    let {email,password}=req.body
    let findUser=await userModel.findOne({email,isVerify:true,isActive:true})
    if(!findUser)return res.json({message:"User Not exist or Admin lock your Account"})
    else if(!bcrypt.compareSync(password,findUser.password)) return res.json({message:"Incorect password or you must Regsister first"})
    let token =jwt.sign({id:findUser._id},"CHEKAUTH")
    return res.json({message:`Welcome ${findUser.userName}`,token})
})

export const forgetPassword=handleAsyncError(async(req,res)=>{
    let{email}=req.body
    //check for existing user by searching about email
    let findUser=await userModel.findOne({email,isVerify:true})
    if(!findUser) return res.json({message:"User Not Exist"})
    //create token to send it to user email 
    let token=jwt.sign({id:findUser._id},"RESET_PASSWORD",{expiresIn:'10m'})
    //generate reset link
    
    // sendResetMail({email,url:`http://localhost:3000/reset-password/${token}`});
    sendResetMail({email,url:`http://localhost:3000/reset-password-message`});

    findUser.ResetPasswordToken=token;
    findUser.save();
    return res.json({message:"Reset password link sent to your email"});
})



export const resetPassword=handleAsyncError(async(req,res)=>{
            
    let {newpassword}=req.body
     let resetToken=req.headers.token;
            
          
        // find the user by ResetPassword from the token
        let findUser = await userModel.findOne({ResetPasswordToken:resetToken})
        if (!findUser) {
            return res.json({ message: "Invalid Token" })
        }
        let hashedNewPassword=bcrypt.hashSync(newpassword,10);
        findUser.password=hashedNewPassword;
        findUser.ResetPasswordToken=""
        findUser.save()
        return res.json({message:"Paswword Reset successfully"})
    })

export const resetPassMessage=(req,res)=>{
    res.json({message:"go to postman to reset your password in reset-password API"})
}

export const updateUser=handleAsyncError(async(req,res)=>{
    let {userName,role,Address,isActive}=req.body
    let findUser= await userModel.findById(req.params.id)
    if(!findUser) return res.json({message:"Invalid ID"})
    findUser.userName=userName
    findUser.role=role
    findUser.Address=Address
    findUser.isActive=isActive
    findUser.save()
    return res.json({message:"updated successfuly",findUser})
})
