const path = require('path');
const fs = require('fs').promises;

const generateExportFileName = (format, prefix = 'export') => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `${prefix}_${timestamp}.${format}`;
};

const ensureDirectoryExists = async (dirPath) => {
  try {
    await fs.access(dirPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(dirPath, { recursive: true });
    } else {
      throw error;
    }
  }
};

const getMimeType = (format) => {
  const mimeTypes = {
    csv: 'text/csv',
    json: 'application/json',
    excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };
  
  return mimeTypes[format] || 'application/octet-stream';
};

module.exports = {
  generateExportFileName,
  ensureDirectoryExists,
  getMimeType,
};