import express from 'express'
import verifyToken from '../../Middleware/verifyToken.js'
import { getMySubmissions } from './submission.controller.js'

const router = express.Router()

router.route('/my-submission').get(verifyToken, getMySubmissions)

export default router
