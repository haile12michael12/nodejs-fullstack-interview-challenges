// Utility functions for standardized responses

// Success response
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

// Error response
const errorResponse = (res, error, message = 'An error occurred', statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message
  });
};

// Validation error response
const validationErrorResponse = (res, errors, message = 'Validation failed', statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors
  });
};

// Not found response
const notFoundResponse = (res, message = 'Resource not found', statusCode = 404) => {
  return res.status(statusCode).json({
    success: false,
    message
  });
};

// Unauthorized response
const unauthorizedResponse = (res, message = 'Unauthorized', statusCode = 401) => {
  return res.status(statusCode).json({
    success: false,
    message
  });
};

// Forbidden response
const forbiddenResponse = (res, message = 'Forbidden', statusCode = 403) => {
  return res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
  forbiddenResponse
};