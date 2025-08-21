const globalErrorHandler = (err, req, res, next) => {
  // Default values
  const statusCode = err.statusCode || 500
  const message = err.message || 'Something went wrong on the server'

  // Optional: log for developers
  console.error('💥 Error:', err)

  // Return JSON response
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}

export default globalErrorHandler