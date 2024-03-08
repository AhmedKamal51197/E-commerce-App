import express from 'express'
import { forgetPassword, resetPassMessage, resetPassword, signIn, signUp, updateUser, verify } from './users.controller.js'
import { validation } from '../../middleware/validation.js'
import { signInSchema, signUpSchema } from './users.validation.js'
import { auth } from '../../middleware/auth.js'
import { admin } from '../../middleware/admin.js'


const userRoutes=express.Router()

userRoutes.post('/signUp',validation(signUpSchema),signUp)

userRoutes.get('/user/verify/:token',verify)

userRoutes.post('/signIn',validation(signInSchema), signIn)

userRoutes.post('/forget-password',forgetPassword)

userRoutes.post('/reset-password',resetPassword)

userRoutes.get('/reset-password-message',resetPassMessage)

userRoutes.put('/updateUser/:id',auth(),admin(),updateUser)
export default userRoutes;