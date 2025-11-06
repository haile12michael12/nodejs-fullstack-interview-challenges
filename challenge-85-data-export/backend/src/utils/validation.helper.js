const { env } = require('../config');

const validateExportFormat = (format) => {
  return env.export.formats.includes(format);
};

const validateExportRequest = (req) => {
  const errors = [];
  
  if (req.query.format && !validateExportFormat(req.query.format)) {
    errors.push(`Invalid format. Supported formats: ${env.export.formats.join(', ')}`);
  }
  
  if (req.body && req.body.limit && req.body.limit > env.export.maxRecords) {
    errors.push(`Limit exceeds maximum allowed records: ${env.export.maxRecords}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = {
  validateExportFormat,
  validateExportRequest,
};