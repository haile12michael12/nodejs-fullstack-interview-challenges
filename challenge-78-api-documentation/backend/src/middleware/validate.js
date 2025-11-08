// Validation middleware
const { validationErrorResponse } = require('../utils/response');
const { validateRequiredFields } = require('../utils/validator');

// Validate request body
const validateBody = (requiredFields) => {
  return (req, res, next) => {
    const errors = validateRequiredFields(req.body, requiredFields);
    
    if (errors.length > 0) {
      return validationErrorResponse(res, errors, 'Validation failed');
    }
    
    next();
  };
};

// Validate request parameters
const validateParams = (requiredParams) => {
  return (req, res, next) => {
    const errors = validateRequiredFields(req.params, requiredParams);
    
    if (errors.length > 0) {
      return validationErrorResponse(res, errors, 'Validation failed');
    }
    
    next();
  };
};

// Validate request query
const validateQuery = (requiredQuery) => {
  return (req, res, next) => {
    const errors = validateRequiredFields(req.query, requiredQuery);
    
    if (errors.length > 0) {
      return validationErrorResponse(res, errors, 'Validation failed');
    }
    
    next();
  };
};

module.exports = {
  validateBody,
  validateParams,
  validateQuery
};