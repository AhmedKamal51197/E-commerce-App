import express from 'express'
import { addCategory, deleteCategory, getAllCategory, getSpecificCategory, updateCategory } from './category.controller.js';
import { validation } from '../../middleware/validation.js';
import { addCategorySchema, updateCategorySchema } from './category.validation.js';
import { auth } from '../../middleware/auth.js';
import { admin } from '../../middleware/admin.js';




const categoryRoutes=express.Router();

categoryRoutes.post("/add-category",validation(addCategorySchema),auth(),admin(),addCategory)

categoryRoutes.put("/update-category/:id",validation(updateCategorySchema),auth(),admin(),updateCategory)

categoryRoutes.delete("/delete-category/:id",auth(),admin(),deleteCategory)

categoryRoutes.get("/getall-category",getAllCategory)

categoryRoutes.get("/getspecific-category/:id",getSpecificCategory)
export default categoryRoutes