const dotenv = require('dotenv');

dotenv.config();

// CORS configuration
const corsConfig = {
  // Allowed origins - can be a string, array, or function
  origin: process.env.CORS_ORIGIN || '*',
  
  // Whether to include credentials (cookies, authorization headers, etc.)
  credentials: process.env.CORS_CREDENTIALS === 'true',
  
  // Allowed HTTP methods
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  
  // Allowed headers
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
  
  // Exposed headers
  exposedHeaders: [
    'X-Request-ID',
    'X-Response-Time'
  ],
  
  // Max age for preflight requests (in seconds)
  maxAge: 86400, // 24 hours
  
  // Whether to allow private network requests
  allowPrivateNetwork: false
};

// Parse origin from environment variable
const parseOrigin = (originEnv) => {
  if (!originEnv || originEnv === '*') {
    return '*';
  }
  
  // If it's a comma-separated list, convert to array
  if (originEnv.includes(',')) {
    return originEnv.split(',').map(origin => origin.trim());
  }
  
  return originEnv;
};

// Whitelist of allowed origins for production
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'https://yourdomain.com'
];

module.exports = {
  corsOptions: {
    ...corsConfig,
    origin: parseOrigin(process.env.CORS_ORIGIN)
  },
  allowedOrigins
};