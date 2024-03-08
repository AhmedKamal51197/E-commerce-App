import Joi from "joi";

export const addCategorySchema =Joi.object({
    name:Joi.string().alphanum().min(4).max(8).required(),
    createdBy:Joi.string().hex().required(),
    photo:Joi.string().required()


})


export const updateCategorySchema=Joi.object({
    id:Joi.string().hex(),
    name:Joi.string().alphanum().min(4).max(8),
    createdBy:Joi.string().hex(),
    photo:Joi.string()
})