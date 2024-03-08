import express from 'express'
import { validation } from '../../middleware/validation.js'
import { addProduct, deleteProduct, getAllProduct, getProductAndCategory, getSpecificProduct, updateProduct } from './product.controller.js'
import { addproductSchema } from './product.validation.js'
import { auth } from '../../middleware/auth.js'
import { admin } from '../../middleware/admin.js'


const productRoutes=express.Router()


productRoutes.post("/add-product/:id",validation(addproductSchema),auth(),admin(),addProduct)

productRoutes.put("/update-product/:id",updateProduct)

productRoutes.delete("/delete-product/:id",auth(),admin(),deleteProduct)

productRoutes.get("/get-all-products",getAllProduct)

productRoutes.get("/get-specific-product/:id",getSpecificProduct)

productRoutes.get("/get-all-products-in-same-category/:id",getProductAndCategory)
export default productRoutes