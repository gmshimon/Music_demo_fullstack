import multer from 'multer'
import pkg from 'multer'
const { StorageEngine } = pkg
import path from 'path'

const storage = multer.memoryStorage()

const trackUploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /mp3|wav|flac|m4a|mp4/
    const extension = path.extname(file.originalname).toLowerCase()

    if (supportedImage.test(extension)) {
      cb(null, true)
    } else {
      cb(new Error('Must be a png/jpg/jpeg image'))
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 10 // 5MB
  }
})

export default trackUploader
