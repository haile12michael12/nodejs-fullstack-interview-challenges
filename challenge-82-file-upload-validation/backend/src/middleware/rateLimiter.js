const rateLimit = require('express-rate-limit');
const config = require('../config');

const uploadRateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    message: 'Too many requests',
    error: 'Rate limit exceeded, please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = uploadRateLimiter;