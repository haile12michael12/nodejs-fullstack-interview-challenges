const rateLimit = require('express-rate-limit');
const config = require('../config');

// Create rate limiter
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: config.rateLimit.message,
  standardHeaders: config.rateLimit.standardHeaders,
  legacyHeaders: config.rateLimit.legacyHeaders,
  // Skip limit for health check endpoint
  skip: (req, res) => req.path === '/health'
});

module.exports = limiter;