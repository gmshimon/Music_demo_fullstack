import mongoose from 'mongoose'
import validate from 'validator'
import { ObjectId } from 'mongodb'
const submissionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate: [validate.isEmail, 'Please enter a valid email']
    },
    phone: {
      type: String,
      default: ''
    },
    biography: {
      type: String,
      default: ''
    },
    location: {
      type: String
    },
    socials: {
      instagram: String,
      soundcloud: String,
      spotify: String,
      youtube: String
    },
    tracks: [{ type: ObjectId, ref: 'tracks', required: true }],
    review: {
      reviewer: { type: ObjectId, ref: 'users' },
      score: { type: Number, min: 1, max: 10 },
      notes: { type: String, trim: true, maxlength: 3000 }, // internal
      feedback: { type: String, trim: true, maxlength: 3000 }, // optional
      createdAt: { type: Date, default: Date.now }
    },
    status: {
      type: String,
      enum: ['Pending', 'In-Review', 'Approved', 'Rejected'],
      default: 'Pending',
      index: true
    },
    createdBy: {
      type: ObjectId,
      ref: 'users'
    }
  },
  {
    timestamps: true
  }
)
const Submission = mongoose.model('submissions', submissionSchema)

export default Submission
