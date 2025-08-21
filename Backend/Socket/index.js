import { Server } from 'socket.io'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

let io

// ✅ helper to verify JWT
const verifyJWT = token => {
  if (!token) throw new Error('No token provided')
  return jwt.verify(token, process.env.TOKEN_SECRET) // must match your backend secret
}

const setupWebSocket = server => {
  io = new Server(server, {
    cors: {
      origin: '*', // you can restrict this to your frontend URL
      methods: ['GET', 'POST']
    }
  })

  // 🔒 middleware to allow only admins
  io.use((socket, next) => {
    try {
      const { token } = socket.handshake.auth // token is { access_token, expiration }

      const jwtToken = JSON.parse(token).access_token
      if (!jwtToken) {
        return next(new Error('Unauthorized: No access_token provided'))
      }

      const user = verifyJWT(jwtToken)
      console.log(user)
      if (user.role !== 'Admin') {
        return next(new Error('Unauthorized: Not an admin'))
      }

      socket.user = user // store user info in socket
      next()
    } catch (err) {
      console.error('❌ WebSocket auth error:', err.message)
      next(new Error('Authentication failed'))
    }
  })

  io.on('connection', socket => {
    console.log(`✅ Admin connected: ${socket.user.email} (${socket.id})`)

    // put this socket into the "admins" room
    socket.join('admins')

    socket.on('disconnect', () => {
      console.log(`❌ Admin disconnected: ${socket.user.email}`)
    })
  })

  return io
}

// 📤 emit new submission to all admins
const emitNewSubmission = submission => {
  if (io) {
    io.to('admins').emit('submission:new', submission)
  }
}

// 📤 emit status update to all admins
const emitSubmissionStatus = ({ submissionId, status }) => {
  if (io) {
    io.to('admins').emit('submission:statusUpdate', { submissionId, status })
  }
}

export { setupWebSocket, emitNewSubmission, emitSubmissionStatus }
