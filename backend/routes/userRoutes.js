import express from 'express'
import User from '../models/User.js'
import UsersController from '../controllers/usersController.js'
import { authorizeRoles } from '../middlewares/authRole.js'
import { authValidate } from '../middlewares/authHandler.js'
 

const userRouter = express.Router()

userRouter.get('/admin', authValidate, authorizeRoles('Admin'), UsersController.getAllUsers)
userRouter.get('/verify', authValidate, UsersController.verifyToken)
userRouter.post('/register', UsersController.registerUser)
userRouter.post('/login', UsersController.loginUser)
userRouter.put('/:id',authValidate, authorizeRoles('Admin'), UsersController.modifyUser)
userRouter.delete('/:id', authValidate, authorizeRoles('Admin'), UsersController.deleteUser)
userRouter.post('/logout', UsersController.logoutUser)

export default userRouter


