import Task from '../models/Tasks.js'
import User from '../models/User.js'
import { validateTask } from '../schema/Task.js'

const getTasks = async (req, res, next) => {
    try {
        if (req.user.role === 'Admin' && req.query.all === 'true') {
            const allTasks = await Task.find().populate('userId', 'username email')
            return res.status(200).json({
            ok: true,
            data: allTasks
            })
        }
        const myTasks = await Task.find({ userId: req.user.id })
        return res.status(200).json({
            ok: true,
            data: myTasks
        })
    } catch (error) {
        next(error)
    }
}


const createNewTask = async (req, res, next) => {
    try {
        
        const result = validateTask(req.body)

        if (!result.success) {
            const errorValidation = new Error('Invalid input data')
            errorValidation.statusCode = 400
            errorValidation.detalles = result.error.format()
            return next(errorValidation)
        }

        const ownerId = req.user.id

        const newTask = new Task({...result.data, userId: ownerId})
        await newTask.save()

        const updatedUser = await User.findByIdAndUpdate(
            ownerId,
            {$push: { taskId: newTask._id } },
            { new: true }
        )

        if (!updatedUser) {
            const userNotFoundError = new Error('User not found');
            userNotFoundError.statusCode = 404;
            return next(userNotFoundError);
        }

        return res.status(201).json({
            ok: true,
            data: newTask
        })
    } catch (error) {
        next(error)
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const taskId = req.params.id
        const taskFound = await Task.findById(taskId)

        if (!taskFound) {
            const errorCustom = new Error('Task not found')
            errorCustom.statusCode = 404
            return next(errorCustom)
        }

        const isOwner = taskFound.userId.toString() === req.user.id
        const isAdmin = req.user.role === 'Admin'

        if (!isOwner && !isAdmin) {
            const errorAccess = new Error('Access denied: Permission required to delete this task')
            errorAccess.statusCode = 403
            return next(errorAccess)
        }

        await taskFound.deleteOne()
        return res.status(200).json({
            ok: true,
            message: 'Task deleted'
        })
    } catch (error) {
        next(error)
    }
}

const updateStatus = async (req, res, next) => {
    try {
        const taskId = req.params.id
        const taskFound = await Task.findById(taskId)

        if(!taskFound) {
            const errorCustom = new Error('Task not found')
            errorCustom.statusCode = 404
            return next(errorCustom)
        }

        const isOwner = taskFound.userId.toString() === req.user.id
        const isAdmin = req.user.role === 'admin'

        if (!isOwner && !isAdmin) {
            const errorAccess = new Error('Access denied: Permission required to update this task')
            errorAccess.statusCode = 403
            return next(errorAccess)
        }

        const { status } = req.body
        taskFound.status = status
        const updateTask = await taskFound.save()

        return res.json({
            ok: true,
            data: updateTask
        })
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {
    try {
        const taskId = req.params.id
        const result = validateTask(req.body)

        if(!result.success) {
            const errorValidationTask = new Error('Invalid data')
            errorValidationTask.statusCode = 400
            errorValidationTask.detalles = result.error.format()
            return next(errorValidationTask)
        }   

        const taskFound = await Task.findById(taskId)

        if (!taskFound) {
            const errorCustom = new Error('Task not found')
            errorCustom.statusCode = 404
            return next(errorCustom)
        }

        const isOwner = taskFound.userId.toString() === req.user.id
        const isAdmin = req.user.role === 'admin'

        if (!isOwner && !isAdmin) {
            const errorAccess = new Error('Access denied: Permission required to update this task')
            errorAccess.statusCode = 403
            return next(errorAccess)
        }

        const updateTask = await Task.findByIdAndUpdate(
            taskId,
            result.data,
            { new: true, runValidators: true}
        )

        return res.status(200).json({
            ok: true,
            data: updateTask
        })
    } catch (error) {
        next(error)
    }
    
}

export default {
    getTasks,
    createNewTask,
    deleteTask,
    updateStatus,
    updateTask
}