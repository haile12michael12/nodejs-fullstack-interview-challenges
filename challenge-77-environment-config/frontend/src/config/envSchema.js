// Environment variable schema validation for frontend
const envSchema = {
  // Node environment
  NODE_ENV: {
    type: 'string',
    valid: ['development', 'production', 'test'],
    default: 'development'
  },
  
  // API configuration
  REACT_APP_API_BASE_URL: {
    type: 'string',
    required: true,
    default: 'http://localhost:3000'
  },
  
  // Feature flags
  REACT_APP_FEATURE_FLAG_ENABLED: {
    type: 'boolean',
    default: false
  },
  
  // Logging
  REACT_APP_LOG_LEVEL: {
    type: 'string',
    valid: ['error', 'warn', 'info', 'debug'],
    default: 'info'
  },
  
  // External services
  REACT_APP_EXTERNAL_API_URL: {
    type: 'string',
    default: 'https://api.example.com'
  }
};

export default envSchema;