import mongoose from 'mongoose'
import validate from 'validator'

const userSchema = mongoose.Schema(
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
      unique: true,
      lowercase: true,
      validate: [validate.isEmail, 'Please enter a valid email']
    },
    phone: {
      type: String,
      default: ''
    },
    bio: {
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
    role: {
      type: String,
      enum: ['Admin', 'Artist'],
      default: 'Artist'
    }
  },
  {
    timestamps: true
  }
)
const Users = mongoose.model('users', userSchema)

export default Users
