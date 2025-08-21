import mongoose from 'mongoose'

const trackSchema = mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    genre: { type: String, trim: true },
    bpm: { type: Number, min: 0, max: 400 },
    key: { type: String, trim: true }, // e.g. "Am", "C#"
    url: { type: String, required: true, trim: true },
    review: {
      reviewer: { type: Types.ObjectId, ref: 'User', required: true },
      score: { type: Number, min: 1, max: 10, required: true },
      notes: { type: String, trim: true, maxlength: 3000 }, // internal
      feedbackForArtist: { type: String, trim: true, maxlength: 3000 }, // optional
      createdAt: { type: Date, default: Date.now }
    },
    status: {
      type: String,
      enum: ['Pending', 'In-Review', 'Approved', 'Rejected'],
      default: 'Pending',
      index: true
    }
  },
  { timestamps: true }
)

const Tracks = mongoose.model('tracks', trackSchema)

export default Tracks
