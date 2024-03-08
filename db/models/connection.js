import mongoose from "mongoose";
export const initConnection=()=>{
    mongoose.connect(`mongodb://localhost:27017/Ecommerce`)
    .then(()=>console.log("DB connected"))
    .catch((err)=>console.log("DB error",err));
}