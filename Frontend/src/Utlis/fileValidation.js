import { SUPPORTED_FORMATS, MAX_FILE_SIZE_BYTES } from './constants'

export const getExtension = (filename = '') =>
  filename.split('.').pop()?.toLowerCase() || ''

export const validateFile = file => {
  const extension = getExtension(file.name)
  if (!SUPPORTED_FORMATS.includes(extension)) {
    return `Unsupported format. Please use: ${SUPPORTED_FORMATS.join(
      ', '
    ).toUpperCase()}`
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return 'File size too large. Maximum 100MB per file.'
  }
  return null
}
