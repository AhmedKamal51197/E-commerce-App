import { categoryModel } from "../../../db/models/category.model.js";
import handleAsyncError from "../../utilis/handleAsyncError.js";

export const addCategory=handleAsyncError(async(req,res)=>{
     
     let addcat=await categoryModel.insertMany(req.body);
     res.json({message:`added Category ${req.body.name} done `,addcat })    
})

export const updateCategory=handleAsyncError(async(req,res)=>{
    let newCategory=await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!newCategory) return res.json({message:"invalid ID this Category doesnot exist"})
    return res.json({message:"Updated done successfuly",newCategory})
})

export const deleteCategory=handleAsyncError(async(req,res)=>{
    let oldCategory=await categoryModel.findByIdAndDelete(req.params.id);
    if(!oldCategory) return res.json({message:"invalid ID this Category doesnot exist"})
    return res.json({message:"Deleted done successfuly",oldCategory})
})

export const getAllCategory=handleAsyncError(async(req,res)=>{
    let allCat=await categoryModel.find()
    if(allCat.length==0)
    {
    return res.json({message:"There is no categories to dispaly"})
    }
    else{

        return res.json({message:"Categories",allCat})
    }
})

export const getSpecificCategory=handleAsyncError(async(req,res)=>{
    let cat=await categoryModel.findById(req.params.id);
    if(!cat) return res.json({message:"Invalid ID this category doesn't exist"})
    return res.json({message:"Result",cat})
}) 