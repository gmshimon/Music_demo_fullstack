import { Server } from 'socket.io'
import dotenv from 'dotenv'

dotenv.config()

let io

const setupWebSocket = server => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })

  const connectedUsers = new Map() // userId -> socketId

  io.on('connection', socket => {
    console.log('🔌 trying to connect the websocket')
    console.info('✅ Socket Client connected')

    socket.on('register', userId => {
      console.log(`🆔 User registered: ${userId} with socket ID: ${socket.id}`)
      connectedUsers.set(userId, socket.id)
    })

    socket.on('disconnect', () => {
      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          console.log(`❌ User disconnected: ${userId}`)
          connectedUsers.delete(userId)
        }
      }
    })
  })
  return io
}

const emitNewSubmission = submission => {
  if (io) {
    io.emit('submission:new', submission) // broadcast to all admins
  }
}
const emitSubmissionStatus = ({ submissionId, status }) => {
  if (io) {
    io.emit('submission:statusUpdate', { submissionId, status })
  }
}
export { setupWebSocket, emitNewSubmission, emitSubmissionStatus }
