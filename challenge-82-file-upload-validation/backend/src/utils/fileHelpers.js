const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Generate a secure filename with UUID
const generateSecureFilename = (originalName) => {
  const ext = path.extname(originalName).toLowerCase();
  const name = path.basename(originalName, ext);
  const sanitized = name.replace(/[^a-zA-Z0-9]/g, '_');
  return `${sanitized}_${uuidv4()}${ext}`;
};

// Sanitize filename to prevent directory traversal
const sanitizeFilename = (filename) => {
  // Remove path traversal attempts
  return filename.replace(/(\.\.[\/\\])+/, '').replace(/^([\/\\])*/, '');
};

// Validate filename for security
const validateFilename = (filename) => {
  // Check for invalid characters
  const invalidChars = /[<>:"/\\|?*\x00-\x1F]/;
  if (invalidChars.test(filename)) {
    return false;
  }
  
  // Check for reserved names on Windows
  const reservedNames = [
    'CON', 'PRN', 'AUX', 'NUL',
    'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9',
    'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'
  ];
  
  const nameWithoutExt = path.basename(filename, path.extname(filename)).toUpperCase();
  if (reservedNames.includes(nameWithoutExt)) {
    return false;
  }
  
  return true;
};

// Get file extension
const getFileExtension = (filename) => {
  return path.extname(filename).toLowerCase();
};

// Get file name without extension
const getFileNameWithoutExtension = (filename) => {
  return path.basename(filename, path.extname(filename));
};

module.exports = {
  generateSecureFilename,
  sanitizeFilename,
  validateFilename,
  getFileExtension,
  getFileNameWithoutExtension,
};