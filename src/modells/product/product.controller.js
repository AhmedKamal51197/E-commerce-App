import slugify from "slugify";
import { productModel } from "../../../db/models/product.model.js";
import handleAsyncError from "../../utilis/handleAsyncError.js";
import { categoryModel } from "../../../db/models/category.model.js";


export const addProduct=handleAsyncError(async(req,res)=>{
    let {productName,price,stock}=req.body
    let findCategory=await categoryModel.findById(req.params.id)
    if(!findCategory) return res.json({message:"the category that you want to add product in it didnot exist"})
    let addproduct=await productModel.insertMany({productName,slug:slugify(productName),price,category:req.params.id,stock})
    return res.json({message:`Product ${productName} added successfuly`,addproduct})
})

export const updateProduct=handleAsyncError(async(req,res)=>{
    let {productName,price,categoryId,stock}=req.body
    let findProduct=await productModel.findByIdAndUpdate(req.params.id,{productName,price,slug:slugify(productName),category:categoryId,stock},{new:true})
    if(!findProduct) return res.json({message:"Product not found"})
    res.json({message:"updated done successfuly",findProduct})    

})

export const deleteProduct=handleAsyncError(async(req,res)=>{
    let findProduct=await productModel.findByIdAndDelete(req.params.id)
    if(!findProduct) return res.json({message:"product not found invalid id"})
    
    res.json({message:"deleted done for product ",findProduct})
})


export const getAllProduct=handleAsyncError(async(req,res)=>{
    let page=req.query.page *1 || 1
    let limit=req.query.limit *1 || 10
    let skip=(page-1)*limit
    let allProduct=await productModel.find().skip(skip).limit(limit)
    if(allProduct.length==0) return res.json({message:"No product to show"})
    res.json({message:`products in page ${page}`,allProduct})
})

export const getSpecificProduct=handleAsyncError(async(req,res)=>{
    let findProduct=await productModel.findById(req.params.id)
    if(!findProduct) return res.json({message:"Product not found"})
    res.json({findProduct})
})

export const getProductAndCategory=handleAsyncError(async(req,res)=>{
    let findcat=await categoryModel.findById(req.params.id)
    if(!findcat) return res.json({message:"there is no Category with that ID "})
    let findProductCat=await productModel.find({category:req.params.id})
    if(findProductCat.length==0)return res.json({message:`No product exist in ${findcat.name}`})
    res.json({message:`products in category : ${findcat.name}`,findProductCat})
})