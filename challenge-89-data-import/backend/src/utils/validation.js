// Simple validation function - in a real application, you would use a library like Joi or Ajv
const validateData = (data) => {
  const errors = [];
  
  // Example validation rules
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  }
  
  if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
    errors.push('Email is required and must be a valid email address');
  }
  
  if (data.age && (isNaN(data.age) || data.age < 0 || data.age > 150)) {
    errors.push('Age must be a number between 0 and 150');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateData
};