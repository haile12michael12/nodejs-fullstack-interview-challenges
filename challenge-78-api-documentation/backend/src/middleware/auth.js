// Authentication middleware
const { unauthorizedResponse, forbiddenResponse } = require('../utils/response');

// Mock authentication - in a real application, this would validate JWT tokens
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return unauthorizedResponse(res, 'Authorization header is required');
  }
  
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return unauthorizedResponse(res, 'Bearer token is required');
  }
  
  // Mock token validation
  if (token !== 'valid-token') {
    return forbiddenResponse(res, 'Invalid token');
  }
  
  // Add user info to request
  req.user = {
    id: 'user-123',
    name: 'Test User',
    email: 'test@example.com'
  };
  
  next();
};

// Mock authorization - in a real application, this would check user permissions
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return unauthorizedResponse(res, 'Authentication required');
    }
    
    // For this example, all authenticated users have access
    next();
  };
};

module.exports = {
  authenticate,
  authorize
};