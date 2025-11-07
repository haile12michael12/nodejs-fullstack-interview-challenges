const errorHandler = (err, req, res, next) => {
  console.error('Error occurred:', err);
  
  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      success: false,
      message: 'File too large',
      error: 'File size exceeds the maximum allowed limit',
    });
  }
  
  if (err.code === 'LIMIT_FILE_COUNT') {
    return res.status(400).json({
      success: false,
      message: 'Too many files',
      error: 'Maximum number of files exceeded',
    });
  }
  
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      success: false,
      message: 'Unexpected field',
      error: 'File field not expected',
    });
  }
  
  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: err.message,
    });
  }
  
  // Custom application errors
  if (err.name === 'ApplicationError') {
    return res.status(400).json({
      success: false,
      message: err.message,
      error: err.details || 'Application error',
    });
  }
  
  // General error
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred',
  });
};

module.exports = errorHandler;