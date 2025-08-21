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

    return res.status(200).json({
      message: 'Submission updated successfully',
      data: updatedSubmission
    })
  } catch (error) {
    next(error)
  }
}
