import express from 'express'
import User from '../models/User.js'
import authController from '../controllers/authController.js'


const userRouter = express.Router()

userRouter.get('/', authController.getAllUsers)
userRouter.post('/register', authController.registerUser)
userRouter.post('/login', authController.loginUser)

export default userRouter


