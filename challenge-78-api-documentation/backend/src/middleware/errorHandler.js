// Error handling middleware
const { errorResponse } = require('../utils/response');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    params: req.params,
    query: req.query,
    body: req.body
  });

  // Determine status code
  const statusCode = err.statusCode || 500;
  
  // Send error response
  errorResponse(res, err, err.message || 'Internal server error', statusCode);
};

module.exports = errorHandler;