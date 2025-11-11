// JWT verification middleware
const { verifyJWT } = require('../services/jwtService');
const { sendError } = require('../core/response');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 401, 'Authorization header required');
  }
  
  const token = authHeader.substring(7);
  
  try {
    const payload = verifyJWT(token);
    req.user = payload;
    next();
  } catch (error) {
    return sendError(res, 401, 'Invalid or expired token');
  }
}

module.exports = authMiddleware;