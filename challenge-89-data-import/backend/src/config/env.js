require('dotenv').config();

const envConfig = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/dataimport',
  jwtSecret: process.env.JWT_SECRET || 'data-import-secret-key',
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  maxFileSize: process.env.MAX_FILE_SIZE || '50mb',
  allowedFileTypes: process.env.ALLOWED_FILE_TYPES || 'csv,json,xlsx',
};

module.exports = envConfig;