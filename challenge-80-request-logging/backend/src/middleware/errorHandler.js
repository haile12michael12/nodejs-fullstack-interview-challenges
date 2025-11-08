const { logger } = require('../config/logger.config');

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  // Log the error with request context
  logger.error('Unhandled error', {
    requestId: req.id,
    error: {
      message: err.message,
      stack: err.stack,
      name: err.name
    },
    url: req.url,
    method: req.method,
    params: req.params,
    query: req.query,
    body: req.body
  });

  // Determine status code
  const statusCode = err.statusCode || 500;
  
  // Send error response
  res.status(statusCode).json({
    success: false,
    requestId: req.id,
    message: process.env.NODE_ENV === 'production' ? 'An error occurred' : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;