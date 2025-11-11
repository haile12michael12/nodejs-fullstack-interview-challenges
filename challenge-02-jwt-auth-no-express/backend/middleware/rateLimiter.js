// Simple IP-based rate limiter
const { sendError } = require('../core/response');

// In-memory store for rate limiting
const rateLimitStore = new Map();

function rateLimiter(maxRequests = 10, windowMs = 60000) {
  return function(req, res, next) {
    const ip = req.connection.remoteAddress || req.socket.remoteAddress;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Get or create rate limit info for this IP
    if (!rateLimitStore.has(ip)) {
      rateLimitStore.set(ip, {
        requests: [],
        blockedUntil: 0
      });
    }
    
    const rateInfo = rateLimitStore.get(ip);
    
    // Check if IP is currently blocked
    if (rateInfo.blockedUntil > now) {
      return sendError(res, 429, 'Too many requests. Please try again later.');
    }
    
    // Remove old requests outside the window
    rateInfo.requests = rateInfo.requests.filter(timestamp => timestamp > windowStart);
    
    // Check if limit exceeded
    if (rateInfo.requests.length >= maxRequests) {
      rateInfo.blockedUntil = now + windowMs;
      return sendError(res, 429, 'Too many requests. Please try again later.');
    }
    
    // Add current request
    rateInfo.requests.push(now);
    next();
  };
}

module.exports = rateLimiter;