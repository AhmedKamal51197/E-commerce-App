import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
        userName:String,
        email:String,
        password:String,
        isVerify:{
            type:Boolean,
            default:false
        },
        role:{
            type:String,
            default:"user"
        },
        ResetPasswordToken:String,
        isActive:{
            type:Boolean,
            default:true
        },
        Address:[]
},
{
    timestamps:true
}
)
const userModel=mongoose.model('User',userSchema);
export default userModel