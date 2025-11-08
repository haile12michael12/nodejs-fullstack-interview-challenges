// Test environment configuration
module.exports = {
  // Database
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'myapp_test',
    user: process.env.DB_USER || 'test_user',
    password: process.env.DB_PASSWORD || 'test_password'
  },
  
  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'error',
    format: 'json'
  },
  
  // API
  api: {
    baseUrl: process.env.EXTERNAL_API_URL || 'https://test-api.example.com',
    timeout: 2000
  },
  
  // Security
  security: {
    jwtSecret: process.env.JWT_SECRET || 'test-secret-key',
    saltRounds: 8
  },
  
  // Cache
  cache: {
    ttl: parseInt(process.env.CACHE_TTL || '60', 10),
    enabled: false
  },
  
  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '60000', 10), // 1 minute
    max: parseInt(process.env.RATE_LIMIT_MAX || '1000', 10)
  },
  
  // Feature flags
  features: {
    flagEnabled: false
  }
};