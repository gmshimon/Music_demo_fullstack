import mongoose from 'mongoose'

const trackSchema = mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    genre: { type: String, trim: true },
    bpm: { type: Number, min: 0, max: 400 },
    key: { type: String, trim: true }, // e.g. "Am", "C#"
    url: { type: String, required: true, trim: true }
  },
  { timestamps: true }
)

const Tracks = mongoose.model('tracks', trackSchema)

export default Tracks
