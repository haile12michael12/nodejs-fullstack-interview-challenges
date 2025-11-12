// Validation utilities
const appConfig = require('../config/appConfig');

function validateFileSize(fileBuffer) {
  return fileBuffer.length <= appConfig.maxFileSize;
}

function validateFileType(filename, contentType) {
  const ext = getFileExtension(filename);
  return appConfig.allowedExtensions.includes(ext) && appConfig.allowedMimeTypes.includes(contentType);
}

function getFileExtension(filename) {
  return '.' + filename.split('.').pop().toLowerCase();
}

function sanitizeFileName(filename) {
  return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
}

module.exports = {
  validateFileSize,
  validateFileType,
  getFileExtension,
  sanitizeFileName
};