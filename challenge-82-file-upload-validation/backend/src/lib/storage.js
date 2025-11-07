const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { generateSecureFilename } = require('../utils/fileHelpers');
const config = require('../config');

// In-memory storage for file metadata (in a real app, this would be a database)
const fileRegistry = new Map();

// Save file to disk
const saveFile = async (fileBuffer, originalName, mimeType) => {
  try {
    // Generate secure filename
    const secureName = generateSecureFilename(originalName);
    const filePath = path.join(config.upload.directory, secureName);
    
    // Save file to disk
    await fs.writeFile(filePath, fileBuffer);
    
    // Store file metadata
    const fileId = uuidv4();
    const fileMetadata = {
      id: fileId,
      originalName,
      secureName,
      filePath,
      mimeType,
      size: fileBuffer.length,
      uploadDate: new Date().toISOString(),
    };
    
    fileRegistry.set(fileId, fileMetadata);
    
    return fileMetadata;
  } catch (error) {
    throw new Error(`Failed to save file: ${error.message}`);
  }
};

// Retrieve file metadata
const getFileMetadata = (fileId) => {
  return fileRegistry.get(fileId);
};

// List all files
const listFiles = () => {
  return Array.from(fileRegistry.values());
};

// Delete file
const deleteFile = async (fileId) => {
  try {
    const fileMetadata = fileRegistry.get(fileId);
    if (!fileMetadata) {
      throw new Error('File not found');
    }
    
    // Delete file from disk
    await fs.unlink(fileMetadata.filePath);
    
    // Remove from registry
    fileRegistry.delete(fileId);
    
    return { success: true, message: 'File deleted successfully' };
  } catch (error) {
    throw new Error(`Failed to delete file: ${error.message}`);
  }
};

// Get file path for serving
const getFilePath = (fileId) => {
  const fileMetadata = fileRegistry.get(fileId);
  if (!fileMetadata) {
    return null;
  }
  return fileMetadata.filePath;
};

module.exports = {
  saveFile,
  getFileMetadata,
  listFiles,
  deleteFile,
  getFilePath,
};