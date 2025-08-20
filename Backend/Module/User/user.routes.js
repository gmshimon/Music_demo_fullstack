import express from 'express'
import { createUser, fetchUser } from './user.controller.js'
const router = express.Router()

router.route('/').post(createUser)
router.route('/get-user').post(fetchUser)

export default router
