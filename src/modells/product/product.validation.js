import Joi from "joi";
export const addproductSchema=Joi.object({
productName:Joi.string().min(4).max(15).required(),
price:Joi.number(),
category:Joi.string().hex(),
stock:Joi.number()

})