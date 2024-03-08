import express from "express";
import userRoutes from "./src/modells/user/users.routes.js";
import { initConnection } from "./db/models/connection.js";
import categoryRoutes from "./src/modells/category/category.routes.js";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { categoryModel } from "./db/models/category.model.js";
import handleAsyncError from "./src/utilis/handleAsyncError.js";
import productRoutes from "./src/modells/product/product.routes.js";
import { auth } from "./src/middleware/auth.js";
import { admin } from "./src/middleware/admin.js";
const app=express()
const port=3000
initConnection()
app.use('/uploads',express.static("uploads/"))
const allowExtensions=['.jpg','.jpeg','.png']  
const storageCat=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/categoryImage')
    },
    filename:function(req,file,cb){
        const fileExtensions=file.originalname.split('.').pop().toLocaleLowerCase();
        if(allowExtensions.includes('.'+fileExtensions)){
            cb(null,uuidv4()+"_"+file.originalname)
        }else{
            cb(new Error('File type not supported'))
        }
    }
})
const uploads=multer({storage:storageCat})
app.post('/uploads-category/:id',uploads.single('image'),auth(),admin(),handleAsyncError(async(req,res)=>{
    console.log(req.params.id)
    
    let addCategoryImages=await categoryModel.findById(req.params.id)
    if(!addCategoryImages) return res.json({message:"Category not Found"})
    addCategoryImages.photo=req.file.filename
    addCategoryImages.save()
    res.json({message:"image of category added susseccfuly",addCategoryImages})
}))
app.get('/getallphoto-category',async(req,res)=>{
    let allPhotos=await categoryModel.find();
    // allPhotos.forEach(image => {
    //          image.photo="http://localhost:3000/uploads/categoryImage/"+image.photo
    //      });
    res.json({message:"All category",allPhotos})
})
app.use(express.json())
app.use(userRoutes)
app.use(categoryRoutes)
app.use(productRoutes)
app.listen(port,()=>console.log(`app listen ${port}`))