#!/usr/bin/env node

const ConfigService = require('../../domain/services/config.service');
const config = require('../../config');
const logger = require('../../infrastructure/logging/logger');

// CLI command to check environment configuration
const checkEnvironment = () => {
  console.log('Environment Configuration Check');
  console.log('============================');
  
  const configService = new ConfigService();
  
  // Check environment
  console.log(`Environment: ${config.env}`);
  
  // Check validation
  const validation = configService.validateConfig();
  console.log(`Configuration Valid: ${validation.isValid ? 'Yes' : 'No'}`);
  
  if (!validation.isValid) {
    console.log(`Missing Keys: ${validation.missingKeys.join(', ')}`);
  }
  
  // Check feature flags
  const features = configService.getFeatureFlags();
  console.log(`Feature Flag Enabled: ${features.enabled ? 'Yes' : 'No'}`);
  
  // Check database config
  console.log(`Database Host: ${config.DB_HOST || 'Not set'}`);
  console.log(`Database Port: ${config.DB_PORT || 'Not set'}`);
  
  // Check API config
  console.log(`API Key Set: ${config.API_KEY ? 'Yes' : 'No'}`);
  console.log(`External API URL: ${config.EXTERNAL_API_URL || 'Not set'}`);
  
  // Show validation result
  console.log('\nValidation Result:');
  if (validation.isValid) {
    console.log('✅ All required environment variables are set');
  } else {
    console.log('❌ Missing required environment variables:');
    validation.missingKeys.forEach(key => console.log(`   - ${key}`));
  }
};

// Run the check if this file is executed directly
if (require.main === module) {
  checkEnvironment();
}

module.exports = { checkEnvironment };