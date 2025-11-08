// Utility functions for validation

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate UUID format
const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

// Validate required fields
const validateRequiredFields = (obj, requiredFields) => {
  const errors = [];
  
  requiredFields.forEach(field => {
    if (!obj[field] && obj[field] !== 0) {
      errors.push(`${field} is required`);
    }
  });
  
  return errors;
};

// Validate string length
const validateStringLength = (str, min, max) => {
  if (typeof str !== 'string') return false;
  return str.length >= min && str.length <= max;
};

// Validate number range
const validateNumberRange = (num, min, max) => {
  if (typeof num !== 'number') return false;
  return num >= min && num <= max;
};

module.exports = {
  isValidEmail,
  isValidUUID,
  validateRequiredFields,
  validateStringLength,
  validateNumberRange
};