const cors = require('cors');
const { corsOptions, allowedOrigins } = require('../config/cors.config');

// Custom CORS middleware with origin validation
const corsMiddleware = cors({
  ...corsOptions,
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }
    
    // If CORS_ORIGIN is set to '*', allow all origins
    if (corsOptions.origin === '*') {
      return callback(null, true);
    }
    
    // If CORS_ORIGIN is an array, check if origin is in the list
    if (Array.isArray(corsOptions.origin)) {
      if (corsOptions.origin.includes(origin)) {
        return callback(null, true);
      }
    } 
    // If CORS_ORIGIN is a string, check for exact match
    else if (typeof corsOptions.origin === 'string') {
      if (corsOptions.origin === origin) {
        return callback(null, true);
      }
    }
    
    // If none of the above, reject the request
    callback(new Error('Not allowed by CORS'));
  }
});

// Preflight request handler
const preflightHandler = (req, res, next) => {
  // Set CORS headers for preflight requests
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Allow-Credentials', corsOptions.credentials ? 'true' : 'false');
  res.header('Access-Control-Max-Age', corsOptions.maxAge.toString());
  
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  
  next();
};

// Security middleware to prevent overly permissive CORS
const corsSecurityMiddleware = (req, res, next) => {
  // Log CORS requests for monitoring
  console.log(`CORS Request from origin: ${req.headers.origin || 'no origin'}`);
  
  // Additional security checks can be added here
  next();
};

module.exports = {
  corsMiddleware,
  preflightHandler,
  corsSecurityMiddleware
};