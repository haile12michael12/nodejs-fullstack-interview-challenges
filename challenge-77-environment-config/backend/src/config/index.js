const dotenv = require('dotenv');
const envSchema = require('./env.validation');
const secretsManager = require('./secrets.manager');

// Load environment variables from .env file
dotenv.config();

// Validate environment variables
const { error, value: validatedEnv } = envSchema.validate(process.env, {
  abortEarly: false,
  allowUnknown: true
});

if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

// Load environment-specific configuration
const nodeEnv = validatedEnv.NODE_ENV || 'development';
let envConfig = {};

try {
  // Special case for test environment
  const envFile = nodeEnv === 'test' ? 'testing' : nodeEnv;
  envConfig = require(`./environments/${envFile}`);
} catch (err) {
  console.warn(`Warning: Could not load ${nodeEnv} environment config, using defaults`);
  envConfig = {};
}

// Merge validated environment variables with environment-specific config
const config = {
  env: nodeEnv,
  ...validatedEnv,
  ...envConfig
};

// Add secrets manager
config.secrets = secretsManager;

// Export the final configuration
module.exports = config;