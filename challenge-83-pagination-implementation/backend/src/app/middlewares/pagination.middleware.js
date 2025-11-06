const { pagination } = require('../../config/env');

const paginationMiddleware = (req, res, next) => {
  // Set default pagination values
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(
    parseInt(req.query.limit) || pagination.defaultLimit,
    pagination.maxLimit
  );
  
  // Ensure page and limit are positive
  req.query.page = Math.max(1, page);
  req.query.limit = Math.max(1, limit);
  
  next();
};

module.exports = paginationMiddleware;