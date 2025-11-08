// Development environment configuration
module.exports = {
  // Database
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'myapp_dev',
    user: process.env.DB_USER || 'dev_user',
    password: process.env.DB_PASSWORD || 'dev_password'
  },
  
  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'debug',
    format: 'pretty'
  },
  
  // API
  api: {
    baseUrl: process.env.EXTERNAL_API_URL || 'https://dev-api.example.com',
    timeout: 10000
  },
  
  // Security
  security: {
    jwtSecret: process.env.JWT_SECRET || 'dev-secret-key',
    saltRounds: 10
  },
  
  // Cache
  cache: {
    ttl: parseInt(process.env.CACHE_TTL || '300', 10),
    enabled: true
  },
  
  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '900000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10)
  },
  
  // Feature flags
  features: {
    flagEnabled: process.env.FEATURE_FLAG_ENABLED === 'true'
  }
};