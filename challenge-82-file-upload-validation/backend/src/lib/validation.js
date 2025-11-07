const mime = require('mime-types');
const { mimeMap } = require('../utils/mimeMap');
const { getFileExtension } = require('../utils/fileHelpers');
const config = require('../config');

// Validate file type based on MIME type
const validateFileType = (file) => {
  const allowedTypes = config.upload.allowedTypes.split(',');
  
  // Check if any allowed type matches
  for (const allowedType of allowedTypes) {
    // Handle wildcard types like 'image/*'
    if (allowedType.endsWith('/*')) {
      const baseType = allowedType.replace('/*', '');
      if (file.mimetype.startsWith(baseType)) {
        return true;
      }
    } else if (file.mimetype === allowedType) {
      // Exact match
      return true;
    }
  }
  
  return false;
};

// Validate file extension
const validateFileExtension = (file) => {
  const ext = getFileExtension(file.originalname);
  
  // Check if extension is in our mimeMap
  for (const mimeType in mimeMap) {
    if (mimeMap[mimeType].includes(ext)) {
      // Check if the MIME type matches
      if (mime.lookup(ext) === file.mimetype) {
        return true;
      }
    }
  }
  
  return false;
};

// Validate file size
const validateFileSize = (file) => {
  return file.size <= config.upload.maxFileSize;
};

// Validate file name
const validateFileName = (file) => {
  // Basic filename validation
  if (!file.originalname || file.originalname.length === 0) {
    return false;
  }
  
  // Check for suspicious characters
  const suspiciousChars = /[<>:"|?*\x00-\x1F]/;
  if (suspiciousChars.test(file.originalname)) {
    return false;
  }
  
  return true;
};

// Comprehensive file validation
const validateFile = (file) => {
  const errors = [];
  
  if (!validateFileName(file)) {
    errors.push('Invalid file name');
  }
  
  if (!validateFileSize(file)) {
    errors.push(`File size exceeds limit of ${config.upload.maxFileSize} bytes`);
  }
  
  if (!validateFileType(file)) {
    errors.push(`File type ${file.mimetype} not allowed`);
  }
  
  if (!validateFileExtension(file)) {
    errors.push('File extension not allowed or mismatched');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = {
  validateFileType,
  validateFileExtension,
  validateFileSize,
  validateFileName,
  validateFile,
};