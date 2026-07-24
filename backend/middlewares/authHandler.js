import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const authValidate = async (req, res, next) => {
    try {
        const token = req.cookies?.token

        if(!token) {
            const errorAuth = new Error("Unauthorized. Please, sign in first")
            errorAuth.statusCode = 401
            return next(errorAuth)
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.uid).select('-password')

        if (!user) {
            const errorUser = new Error("User doesn't exists")
            errorUser.statusCode = 401
            return next(errorUser)
        }

        req.user = user

        next()

    } catch(error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                code: 'AUTH_TOKEN_EXPIRED',
                message: 'Session expired. Please sign in again.'
            })
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({
                success: false,
                code: 'AUTH_TOKEN_INVALID',
                message: 'Invalid authentication token.'
            })
        }
        next(error)
    }
}