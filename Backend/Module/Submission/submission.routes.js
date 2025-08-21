import express from 'express'
import verifyToken from '../../Middleware/verifyToken.js'
import { getAllSubmissions, getMySubmissions, updateSubmission } from './submission.controller.js'

const router = express.Router()
router.route('/update/:id').put(verifyToken,updateSubmission)
router.route('/my-submission').get(verifyToken, getMySubmissions)
router.route('/all-submission').get(verifyToken, getAllSubmissions)

export default router
