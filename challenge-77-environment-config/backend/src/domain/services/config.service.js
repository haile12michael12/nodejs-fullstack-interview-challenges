const config = require('../../config');
const logger = require('../../infrastructure/logging/logger');
const database = require('../../infrastructure/database');

class ConfigService {
  // Get all configuration values
  getAllConfig() {
    return {
      env: config.env,
      port: config.PORT,
      nodeEnv: config.NODE_ENV,
      logLevel: config.LOG_LEVEL,
      cacheTtl: config.CACHE_TTL,
      rateLimit: {
        windowMs: config.RATE_LIMIT_WINDOW,
        max: config.RATE_LIMIT_MAX
      },
      features: {
        flagEnabled: config.FEATURE_FLAG_ENABLED
      },
      db: database.getConfig()
    };
  }

  // Get specific configuration value
  getConfig(key) {
    return config[key];
  }

  // Get environment-specific configuration
  getEnvironmentConfig() {
    return {
      name: config.env,
      isDevelopment: config.env === 'development',
      isProduction: config.env === 'production',
      isTest: config.env === 'test'
    };
  }

  // Get feature flags
  getFeatureFlags() {
    return {
      enabled: config.FEATURE_FLAG_ENABLED
    };
  }

  // Get API configuration
  getApiConfig() {
    return {
      baseUrl: config.EXTERNAL_API_URL,
      timeout: config.api?.timeout || 5000,
      apiKey: config.API_KEY ? '***MASKED***' : undefined
    };
  }

  // Get security configuration (masked for security)
  getSecurityConfig() {
    return {
      jwtSecret: config.JWT_SECRET ? '***MASKED***' : undefined,
      saltRounds: config.security?.saltRounds || 10
    };
  }

  // Validate current configuration
  validateConfig() {
    const requiredKeys = ['DB_HOST', 'API_KEY'];
    const missingKeys = [];
    
    requiredKeys.forEach(key => {
      if (!config[key]) {
        missingKeys.push(key);
      }
    });
    
    return {
      isValid: missingKeys.length === 0,
      missingKeys,
      environment: config.env
    };
  }

  // Get masked configuration for logging
  getMaskedConfig() {
    const maskedConfig = { ...config };
    
    // Mask sensitive values
    if (maskedConfig.JWT_SECRET) {
      maskedConfig.JWT_SECRET = '***MASKED***';
    }
    
    if (maskedConfig.DB_PASSWORD) {
      maskedConfig.DB_PASSWORD = '***MASKED***';
    }
    
    if (maskedConfig.API_KEY) {
      maskedConfig.API_KEY = '***MASKED***';
    }
    
    return maskedConfig;
  }
}

module.exports = ConfigService;