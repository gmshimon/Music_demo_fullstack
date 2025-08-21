import { sendEmail } from '../../Utlis/sendEmail.js'
import Email from '../Email/email.model.js'
import Submission from './submission.model.js'

export const getMySubmissions = async (req, res, next) => {
  try {
    const { _id } = req.user

    const submissions = await Submission.find({
      createdBy: _id
    }).populate('tracks')

    res.status(200).json({
      status: 'Success',
      message: 'Successfully fetched',
      data: submissions
    })
  } catch (error) {
    next(error)
  }
}

export const getAllSubmissions = async (req, res, next) => {
  try {
    const submissions = await Submission.find({}).populate('tracks')

    res.status(200).json({
      status: 'Success',
      message: 'Successfully fetched',
      data: submissions
    })
  } catch (error) {
    next(error)
  }
}

export const updateSubmission = async (req, res, next) => {
  try {
    const { _id, role } = req.user
    const { id } = req.params
    const { review, status } = req.body

    if (role !== 'Admin') {
      return res.status(403).json({
        message: 'You are not Admin'
      })
    }

    // Validate status
    const validStatuses = ['Pending', 'In-Review', 'Approved', 'Rejected']
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }

    // Build update object
    const updateFields = {}
    if (review) {
      updateFields.review = {
        score: review.score,
        notes: review.notes,
        feedback: review.feedback,
        reviewer: req.user._id, // ✅ assign the admin as reviewer
        createdAt: new Date()
      }
    }
    if (status) updateFields.status = status

    const updatedSubmission = await Submission.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    ).populate('tracks')

    if (!updatedSubmission) {
      return res.status(404).json({ message: 'Submission not found' })
    }

    const template = await Email.findOne({
      name: 'submission_status_update'
    })

    if (template) {
      // Prepare variables
      const variables = {
        artist_name: updatedSubmission?.name || 'Artist',
        label_name: 'Music Demo',
        status: updatedSubmission.status,
        feedback: updatedSubmission.review?.feedback || ''
      }

      // Replace placeholders (Handlebars-style)
      let subject = template.subject
      let html = template.html
      for (const key in variables) {
        const regex = new RegExp(`{{${key}}}`, 'g')
        subject = subject.replace(regex, variables[key] || '')
        html = html.replace(regex, variables[key] || '')
      }

      // If template has conditional {{#if feedback}}
      if (!variables.feedback) {
        html = html.replace(/{{#if feedback}}[\s\S]*?{{\/if}}/, '')
      } else {
        html = html.replace(/{{#if feedback}}|{{\/if}}/g, '')
      }

      // ✅ Send email
      await sendEmail({
        to: updatedSubmission?.email,
        subject,
        html
      })
    }

    return res.status(200).json({
      message: 'Submission updated successfully',
      data: updatedSubmission
    })
  } catch (error) {
    next(error)
  }
}
