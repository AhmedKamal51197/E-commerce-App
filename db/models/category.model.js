
import mongoose, { Mongoose } from "mongoose";
const  categorySchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    photo:
    {
        type:String,
        
    }

},
{timestamps:true}
)

categorySchema.pre('init',function(doc){
    doc.photo="http://localhost:3000/uploads/categoryImage/"+doc.photo
})

export const categoryModel=mongoose.model('Category',categorySchema);