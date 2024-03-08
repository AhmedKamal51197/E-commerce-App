import userModel from "../../db/models/user.model.js"

export const admin=()=>{
return async(req,res,next)=>{
    let findAdmin=await userModel.findById(req.userId);
    if(findAdmin.role=="admin")
    {
        //req.User=findAdmin;
        next()
    }
    else{
        return res.json({message:"Access deny You are not admin"})
    }
}


}