import express from 'express'
import verifyToken from '../../Middleware/verifyToken.js'
import trackUploader from '../../Middleware/FileUpload/trackUploader.js'
import { createTrack } from './track.controller.js'
const router = express.Router()

router
  .route('/create-track')
  .post(verifyToken, trackUploader.array('files', 20), createTrack)

export default router
