// Main frontend configuration
import validateEnv, { maskEnvVars } from './validateEnv';

// Validate environment variables
const { isValid, errors, validatedEnv } = validateEnv();

if (!isValid) {
  console.error('Environment validation errors:', errors);
  // In development, we might want to show a warning but continue
  // In production, we might want to throw an error
  if (process.env.NODE_ENV === 'production') {
    throw new Error(`Environment validation failed: ${errors.join(', ')}`);
  }
}

// Create configuration object
const config = {
  env: validatedEnv.NODE_ENV || 'development',
  api: {
    baseUrl: validatedEnv.REACT_APP_API_BASE_URL || 'http://localhost:3000',
    externalUrl: validatedEnv.REACT_APP_EXTERNAL_API_URL || 'https://api.example.com'
  },
  features: {
    flagEnabled: validatedEnv.REACT_APP_FEATURE_FLAG_ENABLED === true
  },
  logging: {
    level: validatedEnv.REACT_APP_LOG_LEVEL || 'info'
  },
  // Masked environment variables for logging
  get maskedEnv() {
    return maskEnvVars(validatedEnv);
  }
};

export default config;