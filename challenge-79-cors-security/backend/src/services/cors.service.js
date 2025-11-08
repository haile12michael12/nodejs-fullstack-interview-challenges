const { corsOptions, allowedOrigins } = require('../config/cors.config');

class CorsService {
  // Get current CORS configuration
  getCurrentConfig() {
    return {
      origin: corsOptions.origin,
      credentials: corsOptions.credentials,
      methods: corsOptions.methods,
      allowedHeaders: corsOptions.allowedHeaders,
      exposedHeaders: corsOptions.exposedHeaders,
      maxAge: corsOptions.maxAge,
      allowPrivateNetwork: corsOptions.allowPrivateNetwork
    };
  }

  // Update CORS configuration
  updateConfig(newConfig) {
    // In a real application, this would persist to a database
    // For this challenge, we'll just return the new config
    return {
      ...corsOptions,
      ...newConfig
    };
  }

  // Validate origin against whitelist
  validateOrigin(origin) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return true;
    }
    
    // If CORS_ORIGIN is set to '*', allow all origins
    if (corsOptions.origin === '*') {
      return true;
    }
    
    // If CORS_ORIGIN is an array, check if origin is in the list
    if (Array.isArray(corsOptions.origin)) {
      return corsOptions.origin.includes(origin);
    }
    
    // If CORS_ORIGIN is a string, check for exact match
    if (typeof corsOptions.origin === 'string') {
      return corsOptions.origin === origin;
    }
    
    return false;
  }

  // Get allowed origins
  getAllowedOrigins() {
    return allowedOrigins;
  }

  // Add origin to whitelist
  addOriginToWhitelist(origin) {
    if (!allowedOrigins.includes(origin)) {
      allowedOrigins.push(origin);
    }
    return allowedOrigins;
  }

  // Remove origin from whitelist
  removeOriginFromWhitelist(origin) {
    const index = allowedOrigins.indexOf(origin);
    if (index > -1) {
      allowedOrigins.splice(index, 1);
    }
    return allowedOrigins;
  }
}

module.exports = CorsService;