// File service for handling file operations
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const SecurityScanner = require('./SecurityScanner');
const appConfig = require('../config/appConfig');

class FileService {
  static saveFile(fileBuffer, originalFilename) {
    // Sanitize filename
    const sanitizedFilename = this.sanitizeFileName(originalFilename);
    
    // Generate unique filename
    const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}_${fileHash.substring(0, 8)}_${sanitizedFilename}`;
    const filePath = path.join(appConfig.uploadDir, uniqueFilename);
    
    // Save file
    fs.writeFileSync(filePath, fileBuffer);
    
    return {
      originalName: originalFilename,
      savedName: uniqueFilename,
      size: fileBuffer.length,
      path: filePath
    };
  }

  static sanitizeFileName(filename) {
    return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
  }

  static listFiles() {
    const files = fs.readdirSync(appConfig.uploadDir);
    return files.map(filename => {
      const filePath = path.join(appConfig.uploadDir, filename);
      const stats = fs.statSync(filePath);
      
      return {
        name: filename,
        size: stats.size,
        uploadTime: stats.birthtime.toISOString(),
        modifiedTime: stats.mtime.toISOString()
      };
    });
  }

  static deleteFile(filename) {
    const filePath = path.join(appConfig.uploadDir, filename);
    
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }
    
    fs.unlinkSync(filePath);
  }

  static validateFileSize(fileBuffer) {
    return fileBuffer.length <= appConfig.maxFileSize;
  }
}

module.exports = FileService;