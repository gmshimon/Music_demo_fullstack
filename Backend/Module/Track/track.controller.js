import { submissionConfirmationTemplate } from '../../Utlis/EmailTemplate/email-templates.js'
import { sendEmail } from '../../Utlis/sendEmail.js'
import Users from '../User/user.model.js'
import { uploadTrackFile } from './track.cloudinary.js'
import Tracks from './track.model.js'

export const createTrack = async (req, res, next) => {
  try {
    const userId = req.user?._id
    const file = req.file

    const {
      // track fields
      title,
      genre,
      bpm,
      key,
      // user updates (all optional; only provided fields will be updated)
      name,
      phone,
      bio,
      location,
      socials = {}
    } = req.body

    if (!title) return res.status(400).json({ error: 'title is required' })

    let finalUrl
    if (file) {
      finalUrl = await uploadTrackFile(file)
    }

    const $set = {}
    if (name !== undefined) $set.name = name
    if (phone !== undefined) $set.phone = phone
    if (bio !== undefined) $set.bio = bio
    if (location !== undefined)
      $set.location = location[
        ('instagram', 'soundcloud', 'spotify', 'youtube')
      ].forEach(k => {
        if (socials && socials[k] !== undefined)
          $set[`socials.${k}`] = socials[k]
      })

    const user = await Users.findByIdAndUpdate(userId, { $set }, { new: true })
    if (!updatedUser) return res.status(404).json({ error: 'User not found' })

    const trackDoc = await Tracks.create({
      title,
      genre,
      bpm,
      key,
      url: finalUrl
    })

    const emailHtml = submissionConfirmationTemplate({})
    await sendEmail({
      to: user.email,
      subject: 'Track Submission confirmation',
      html: emailHtml
    })

    res.status(200).json({
      status: 'Success',
      message: 'Track Uploaded Successfully',
      data: trackDoc
    })
  } catch (error) {
    next(error)
  }
}
