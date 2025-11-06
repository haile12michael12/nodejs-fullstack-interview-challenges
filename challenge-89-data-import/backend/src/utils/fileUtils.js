const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const detectFileType = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.csv':
      return 'csv';
    case '.json':
      return 'json';
    case '.xlsx':
    case '.xls':
      return 'xlsx';
    default:
      return 'unknown';
  }
};

const saveTempFile = async (fileBuffer, originalName) => {
  const tempDir = './temp';
  await fs.mkdir(tempDir, { recursive: true });
  
  const fileId = uuidv4();
  const fileExt = path.extname(originalName);
  const tempFileName = `${fileId}${fileExt}`;
  const tempFilePath = path.join(tempDir, tempFileName);
  
  await fs.writeFile(tempFilePath, fileBuffer);
  
  return {
    id: fileId,
    path: tempFilePath,
    name: tempFileName
  };
};

const deleteTempFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error('Error deleting temp file:', error);
  }
};

module.exports = {
  detectFileType,
  saveTempFile,
  deleteTempFile
};