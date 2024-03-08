import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        unique:true
    },
    slug:{
        type:String,
        unique:true
    },
    priceAfterDiscount:{
        type:Number,
        default:0
    },
    price:Number,
    finalPrice:{
       type: Number,
        default:0
    },
    image:{
        type:String,
        default:""
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category"
    },
    stock:Number
}
,
{timestamps:true}
) 

export const productModel= mongoose.model('Product',productSchema)