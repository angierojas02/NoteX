import express from 'express'
import Task from '../models/Tasks.js'
import taskController from '../controllers/taskController.js'
import { authorizeRoles } from '../middlewares/authRoje.js'
import { authValidate } from '../middlewares/authHandler.js'

const taskRouter = express.Router()

taskRouter.get('/', authValidate, authorizeRoles('Admin','User'), taskController.getTasks)

taskRouter.post('/', authValidate, authorizeRoles('Admin','User'), taskController.createNewTask)

taskRouter.delete('/:id', authValidate, authorizeRoles('Admin','User'), taskController.deleteTask)

taskRouter.patch ('/:id', authValidate, authorizeRoles('Admin','User'), taskController.updateStatus)

taskRouter.put('/:id', authValidate, authorizeRoles('Admin','User'), taskController.updateTask)


export default taskRouter