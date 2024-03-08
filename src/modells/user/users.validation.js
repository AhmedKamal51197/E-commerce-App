import Joi from "joi"
const signUpSchema=Joi.object({
    userName:Joi.string().alphanum().min(3).max(9).required(),
    email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net','pro']}}).required(),
    Address:Joi.array(),
    password:Joi.string().pattern(/^[A-Z][a-z0-9]{3,8}$/).required(),
    Cfpassword:Joi.ref('password')
})


const signInSchema=Joi.object({
    email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net','pro']}}).required(),
    password:Joi.string().pattern(/^[A-Z][a-z0-9]{3,8}$/).required()
})

export {signUpSchema,
signInSchema}