const Joi = require('joi');

// Define the validation schema for environment variables
const envSchema = Joi.object({
  // Node environment
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .default('development'),
  
  // Server configuration
  PORT: Joi.number()
    .port()
    .default(3000),
  
  // Database configuration
  DB_HOST: Joi.string()
    .hostname()
    .required(),
  
  DB_PORT: Joi.number()
    .port()
    .default(5432),
  
  DB_NAME: Joi.string()
    .default('myapp'),
  
  DB_USER: Joi.string()
    .default('user'),
  
  DB_PASSWORD: Joi.string()
    .default('password'),
  
  // API configuration
  API_KEY: Joi.string()
    .required(),
  
  // Logging configuration
  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'info', 'debug')
    .default('info'),
  
  // Security configuration
  JWT_SECRET: Joi.string()
    .default('your-secret-key'),
  
  // External service configuration
  EXTERNAL_API_URL: Joi.string()
    .uri()
    .default('https://api.example.com'),
  
  // Feature flags
  FEATURE_FLAG_ENABLED: Joi.boolean()
    .default(false),
  
  // Cache configuration
  CACHE_TTL: Joi.number()
    .integer()
    .default(300),
  
  // Rate limiting
  RATE_LIMIT_WINDOW: Joi.number()
    .integer()
    .default(900000), // 15 minutes
  
  RATE_LIMIT_MAX: Joi.number()
    .integer()
    .default(100)
});

module.exports = envSchema;