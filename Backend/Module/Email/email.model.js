import mongoose from 'mongoose'

const emailSchema = mongoose.Schema(
    {
    name: {
      type: String,
      required: true,
      unique: true, // e.g. "approval_email", "rejection_email"
      trim: true
    },
    subject: {
      type: String,
      required: true,
      trim: true
    },
    html: {
      type: String,
      required: true // The actual HTML content with {{variables}}
    },
    variables: {
      type: [String], // list of allowed variables (like ["artist_name","status"])
      default: []
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: false
    }
  }
)
const Email = mongoose.model('emails', emailSchema)

export default Email