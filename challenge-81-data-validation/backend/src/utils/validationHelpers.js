// Validation helper functions

// Check if a value is a valid email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Check if a value is a valid phone number
const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(phone);
};

// Check if a value is a valid zip code
const isValidZipCode = (zipCode) => {
  const zipRegex = /^[0-9]{5}(-[0-9]{4})?$/;
  return zipRegex.test(zipCode);
};

// Check if age is within valid range
const isValidAge = (age) => {
  return Number.isInteger(age) && age >= 13 && age <= 120;
};

// Check if price has valid precision
const isValidPrice = (price) => {
  return !isNaN(price) && price >= 0 && /^\d+(\.\d{1,2})?$/.test(price);
};

// Format validation errors
const formatErrors = (errors) => {
  return errors.map(error => ({
    field: error.path.join('.'),
    message: error.message
  }));
};

// Merge validation results
const mergeValidationResults = (results) => {
  const merged = {
    isValid: true,
    errors: []
  };

  results.forEach(result => {
    if (!result.isValid) {
      merged.isValid = false;
      merged.errors = merged.errors.concat(result.errors);
    }
  });

  return merged;
};

// Conditional validation helper
const conditionalValidate = (condition, validator) => {
  return (value, context) => {
    if (condition(context)) {
      return validator(value);
    }
    return { isValid: true };
  };
};

module.exports = {
  isValidEmail,
  isValidPhone,
  isValidZipCode,
  isValidAge,
  isValidPrice,
  formatErrors,
  mergeValidationResults,
  conditionalValidate
};