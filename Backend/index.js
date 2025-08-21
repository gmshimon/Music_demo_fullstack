import mongoose from 'mongoose'
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import globalErrorHandler from './Middleware/GlobalErrorHandler/globalErrorHandler.js'
import { setupWebSocket } from './Socket/index.js'
const { query } = express
dotenv.config()
const port = process.env.PORT || 5000

const app = express()
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
)
const server = http.createServer(app)

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json())

setupWebSocket(server);

const uri = 'mongodb://127.0.0.1:27017/music_demo'
// const uri = process.env.MONGODB_URI

mongoose.connect(uri).then(() => {
  console.log('🛢️ Connected to MongoDB')
})

import userRouter from './Module/User/user.routes.js'
import trackRouter from './Module/Track/track.routes.js'
import submissionRouter from './Module/Submission/submission.routes.js'
import emailRoutes from './Module/Email/email.routes.js'


app.use('/api/v1/user', userRouter)
app.use('/api/v1/tracks', trackRouter)
app.use('/api/v1/submission', submissionRouter)
app.use('/api/v1/email', emailRoutes) 
app.get('/', async (req, res) => {
  res.send('API is running')
})

// Global error handler
app.use(globalErrorHandler)

server.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`)
})

export default app
