const { validateExportRequest } = require('../utils/validation.helper');

const validateExportMiddleware = (req, res, next) => {
  const validation = validateExportRequest(req);
  
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      errors: validation.errors,
    });
  }
  
  next();
};

module.exports = {
  validateExportMiddleware,
};