import express from 'express'
import verifyToken from '../../Middleware/verifyToken'
import trackUploader from '../../Middleware/FileUpload/trackUploader'
import { createTrack } from './track.controller'
const router = express.Router()

router.route('/create-track').post(verifyToken,trackUploader.single('file'),createTrack)

export default router