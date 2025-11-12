// File controller for handling HTTP requests
const FileService = require('./FileService');
const SecurityScanner = require('./SecurityScanner');
const MultipartStreamParser = require('./MultipartStreamParser');
const appConfig = require('../config/appConfig');

class FileController {
  static async handleUpload(req, res) {
    if (req.method !== 'POST') {
      return this.sendError(res, 405, 'Method not allowed');
    }

    try {
      // Extract boundary from Content-Type header
      const contentType = req.headers['content-type'];
      if (!contentType || !contentType.includes('multipart/form-data')) {
        return this.sendError(res, 400, 'Content-Type must be multipart/form-data');
      }

      const boundaryMatch = contentType.match(/boundary=([^;]+)/);
      if (!boundaryMatch) {
        return this.sendError(res, 400, 'No boundary found in Content-Type header');
      }

      const boundary = boundaryMatch[1];
      const parser = new MultipartStreamParser(boundary);

      req.on('data', (chunk) => {
        parser.write(chunk);
      });

      req.on('end', () => {
        const parts = parser.end();
        
        if (parts.length === 0) {
          return this.sendError(res, 400, 'No file parts found');
        }

        // Find the file part
        let filePart = null;
        for (const part of parts) {
          if (part.headers['content-disposition'] && part.headers['content-disposition'].includes('filename=')) {
            filePart = part;
            break;
          }
        }

        if (!filePart) {
          return this.sendError(res, 400, 'No file found in request');
        }

        // Extract file information
        const contentDisposition = filePart.headers['content-disposition'];
        const contentType = filePart.headers['content-type'];
        const filename = this.extractFilename(contentDisposition);
        const fileBuffer = filePart.body;

        if (!filename || fileBuffer.length === 0) {
          return this.sendError(res, 400, 'Invalid file');
        }

        // Validate file size
        if (!FileService.validateFileSize(fileBuffer)) {
          return this.sendError(res, 413, 'File too large');
        }

        // Validate file type
        if (!SecurityScanner.isAllowedFile(filename, contentType, appConfig)) {
          return this.sendError(res, 400, 'File type not allowed');
        }

        // Security scan
        const scanResult = SecurityScanner.scanFile(fileBuffer, filename);

        if (!scanResult.safe) {
          return this.sendError(res, 400, `File rejected: ${scanResult.threats.join(', ')}`);
        }

        // Save file
        const fileRecord = FileService.saveFile(fileBuffer, filename);

        // Return success response
        const response = {
          success: true,
          file: {
            originalName: fileRecord.originalName,
            savedName: fileRecord.savedName,
            size: fileRecord.size,
            type: contentType,
            hash: scanResult.hash,
            uploadTime: new Date().toISOString(),
            scanResult: {
              safe: scanResult.safe,
              risk: scanResult.risk,
              threats: scanResult.threats
            }
          }
        };

        this.sendResponse(res, 200, response);
      });

    } catch (error) {
      console.error('Upload error:', error);
      this.sendError(res, 500, 'Upload failed');
    }
  }

  static async handleListFiles(req, res) {
    try {
      const files = FileService.listFiles();
      this.sendResponse(res, 200, { files });
    } catch (error) {
      console.error('Error listing files:', error);
      this.sendError(res, 500, 'Failed to list files');
    }
  }

  static async handleDeleteFile(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const filename = url.searchParams.get('filename');

    if (!filename) {
      return this.sendError(res, 400, 'Filename parameter required');
    }

    try {
      FileService.deleteFile(filename);
      this.sendResponse(res, 200, { message: 'File deleted successfully' });
    } catch (error) {
      console.error('Error deleting file:', error);
      if (error.message === 'File not found') {
        this.sendError(res, 404, 'File not found');
      } else {
        this.sendError(res, 500, 'Failed to delete file');
      }
    }
  }

  static sendResponse(res, statusCode, data, contentType = 'application/json') {
    res.writeHead(statusCode, { 'Content-Type': contentType });
    res.end(typeof data === 'string' ? data : JSON.stringify(data));
  }

  static sendError(res, statusCode, message) {
    this.sendResponse(res, statusCode, { error: message });
  }

  static extractFilename(contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
    if (filenameMatch && filenameMatch[1]) {
      return filenameMatch[1].replace(/['"]/g, '');
    }
    return null;
  }
}

module.exports = FileController;