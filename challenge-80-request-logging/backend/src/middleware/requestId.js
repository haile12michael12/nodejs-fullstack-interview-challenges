const { v4: uuidv4 } = require('uuid');

// Middleware to generate and attach a unique request ID to each request
const requestIdMiddleware = (req, res, next) => {
  // Generate a unique request ID if one doesn't already exist
  req.id = req.headers['x-request-id'] || uuidv4();
  
  // Add the request ID to the response headers
  res.setHeader('X-Request-ID', req.id);
  
  next();
};

module.exports = requestIdMiddleware;