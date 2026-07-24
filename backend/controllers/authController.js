import User from '../models/User.js'
import { validateUser } from '../schema/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const getAllUsers = async (req, res, next) => {

    try {
        const allUser = await User.find().populate('taskId', 'title description')
        return res.status(200).json({
            ok: true,
            data: allUser
        })
    } catch (error) {
        next(error)
    }
}

const registerUser = async (req, res, next) => {
    try {

        // SE VALIDA CON ZOD SI LOS DATOS CORRESPONDEN
        const result = validateUser(req.body)
        
        //SI NO CORRESPONDEN, ES UN ERROR
        if (!result.success) {
            const errorValidationUser = new Error('Invalid registration data')
            errorValidationUser.statusCode = 400
            errorValidationUser.detalles = result.error.format()
            return next(errorValidationUser)
        }

        //EXTRAEMOS LOS DATOS DEL RESULT
        const {username, email, password, role } = result.data

        //VERIFICAMOS QUE EL USUARIO YA EXISTE, SI SÍ, SE LANZA OTRO ERROR
        const userExists = await User.findOne({ $or: [{ email }, { username }] })
        if (userExists) {
            const errorDuplicated = new Error('The username or email already exists!')
            errorDuplicated.statusCode = 409
            return next(errorDuplicated)
        }

        //GENERAMOS EL SALT Y EL PASSWORD HASHEADO
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //CREAMOS EL USUARIO
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        })
        await newUser.save()

        return res.status(201).json({
            ok: true,
            message: 'User created successfully'
        })

    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const {username, password} = req.body

        const userAuth = await User.findOne({ username })

        if (!userAuth) {
            const errorAuth = new Error('Incorrect email or password')
            errorAuth.statusCode = 401
            return next(errorAuth)
        }

        const isMatchPass = await bcrypt.compare(password, userAuth.password)
        if (!isMatchPass) {
            const errorAuth = new Error('Incorrect email or password')
            errorAuth.statusCode = 401
            return next(errorAuth)
        }

        const token = jwt.sign(
            { uid: userAuth._id, username: userAuth.username, role: userAuth.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h'}
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            ok: true,
            message: 'Login successful',
            user: {id:userAuth._id, username: userAuth.username, role: userAuth.role }
        })

    } catch (error) {
        next(error)
    }
}

const logoutUser = (req, res, next) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', 
        })

        return res.status(200).json({
            ok: true,
            message: 'Logged out successfully'
        })
    } catch (error) {
        next(error)
    }
}


export default {
    getAllUsers,
    registerUser,
    loginUser,
    logoutUser
}