// Environment variable validation for frontend
import envSchema from './envSchema';

// Validate environment variables
export const validateEnv = (envVars = process.env) => {
  const errors = [];
  const validatedEnv = {};
  
  // Validate each environment variable
  Object.keys(envSchema).forEach(key => {
    const schema = envSchema[key];
    const value = envVars[key];
    
    // Check if required
    if (schema.required && (value === undefined || value === '')) {
      errors.push(`Missing required environment variable: ${key}`);
      return;
    }
    
    // Use default if not set
    if (value === undefined || value === '') {
      validatedEnv[key] = schema.default;
      return;
    }
    
    // Type validation
    if (schema.type === 'number') {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        errors.push(`Invalid number for ${key}: ${value}`);
        return;
      }
      validatedEnv[key] = numValue;
    } else if (schema.type === 'boolean') {
      validatedEnv[key] = value === 'true';
    } else if (schema.type === 'string') {
      // Validate against valid values if specified
      if (schema.valid && !schema.valid.includes(value)) {
        errors.push(`Invalid value for ${key}: ${value}. Valid values: ${schema.valid.join(', ')}`);
        return;
      }
      validatedEnv[key] = value;
    } else {
      validatedEnv[key] = value;
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
    validatedEnv
  };
};

// Get masked environment variables for logging
export const maskEnvVars = (envVars) => {
  const maskedVars = { ...envVars };
  
  // Mask sensitive variables
  const sensitiveKeys = ['KEY', 'SECRET', 'PASSWORD', 'TOKEN'];
  
  Object.keys(maskedVars).forEach(key => {
    const upperKey = key.toUpperCase();
    if (sensitiveKeys.some(sensitive => upperKey.includes(sensitive))) {
      maskedVars[key] = '***MASKED***';
    }
  });
  
  return maskedVars;
};

export default validateEnv;