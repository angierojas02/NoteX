import express from 'express'
import crypto from 'crypto'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import { title } from 'process'
import taskRoutes from './routes/taskRoutes.js'
import userRoutes from './routes/userRoutes.js'
import connectDB from './config/db.js'
import { errorHandler } from './middlewares/errorHandler.js'

connectDB()

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://notex-frontend.vercel.app', 
  credentials: true                
}))

const PORT = process.env.PORT ?? 1234

app.get('/health', (req, res) => {
  res.status(200).send('OK')
})

app.use('/tasks', taskRoutes)
app.use('/users', userRoutes)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`SERVER LISTENING PORT http://localhost:${PORT}`)
})