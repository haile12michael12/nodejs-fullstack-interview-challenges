const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

module.exports = {
  port: parseInt(process.env.PORT || '3000', 10),
  upload: {
    maxFileSize: parseInt(process.env.UPLOAD_MAX_SIZE || '10485760', 10), // 10MB default
    allowedTypes: process.env.UPLOAD_ALLOWED_TYPES || 'image/*',
    directory: process.env.UPLOAD_DIR || path.join(__dirname, '../../uploads'),
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
};