const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const UPLOAD_DIR = path.join(__dirname, 'uploads');

// Allowed file extensions and MIME types
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.txt', '.doc', '.docx'];
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

// Create uploads directory if it doesn't exist
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Utility functions
function sendResponse(res, statusCode, data, contentType = 'application/json') {
  res.writeHead(statusCode, { 'Content-Type': contentType });
  res.end(typeof data === 'string' ? data : JSON.stringify(data));
}

function sendError(res, statusCode, message) {
  sendResponse(res, statusCode, { error: message });
}

function sanitizeFileName(filename) {
  return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
}

function getFileExtension(filename) {
  return path.extname(filename).toLowerCase();
}

function isAllowedFile(filename, contentType) {
  const ext = getFileExtension(filename);
  return ALLOWED_EXTENSIONS.includes(ext) && ALLOWED_MIME_TYPES.includes(contentType);
}

function calculateFileHash(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function scanFileForMalware(buffer, filename) {
  // Basic security scan - in real implementation, you'd use proper antivirus
  const suspiciousPatterns = [
    /eval\s*\(/i,
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /onload=/i,
    /onerror=/i
  ];

  const content = buffer.toString('utf8', 0, Math.min(buffer.length, 10240)); // Check first 10KB
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(content)) {
      return {
        safe: false,
        threats: ['Suspicious script patterns detected'],
        risk: 'HIGH'
      };
    }
  }

  // Check file size for suspicious patterns
  if (buffer.length === 0) {
    return {
      safe: false,
      threats: ['Empty file'],
      risk: 'LOW'
    };
  }

  return {
    safe: true,
    threats: [],
    risk: 'LOW'
  };
}

function parseMultipartData(buffer, boundary) {
  const parts = [];
  const boundaryBuffer = Buffer.from(`--${boundary}`);
  const endBoundaryBuffer = Buffer.from(`--${boundary}--`);
  
  let start = 0;
  let end = buffer.indexOf(boundaryBuffer);
  
  while (end !== -1) {
    const partStart = end + boundaryBuffer.length;
    const nextBoundary = buffer.indexOf(boundaryBuffer, partStart);
    
    if (nextBoundary === -1) break;
    
    const partBuffer = buffer.slice(partStart, nextBoundary);
    
    // Parse headers
    const headerEnd = partBuffer.indexOf('\r\n\r\n');
    if (headerEnd === -1) {
      start = nextBoundary;
      end = buffer.indexOf(boundaryBuffer, start);
      continue;
    }
    
    const headerBuffer = partBuffer.slice(0, headerEnd);
    const bodyBuffer = partBuffer.slice(headerEnd + 4);
    
    const headers = {};
    const headerLines = headerBuffer.toString().split('\r\n');
    
    for (const line of headerLines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim().toLowerCase();
        const value = line.slice(colonIndex + 1).trim();
        headers[key] = value;
      }
    }
    
    parts.push({
      headers,
      body: bodyBuffer
    });
    
    start = nextBoundary;
    end = buffer.indexOf(boundaryBuffer, start);
  }
  
  return parts;
}

function extractFilename(contentDisposition) {
  const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
  if (filenameMatch && filenameMatch[1]) {
    return filenameMatch[1].replace(/['"]/g, '');
  }
  return null;
}

// Route handlers
async function handleUpload(req, res) {
  if (req.method !== 'POST') {
    return sendError(res, 405, 'Method not allowed');
  }

  let body = Buffer.alloc(0);
  
  req.on('data', (chunk) => {
    body = Buffer.concat([body, chunk]);
    
    // Check file size limit
    if (body.length > MAX_FILE_SIZE) {
      res.writeHead(413, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'File too large. Maximum size is 10MB.' }));
      return;
    }
  });

  req.on('end', () => {
    try {
      // Extract boundary from Content-Type header
      const contentType = req.headers['content-type'];
      if (!contentType || !contentType.includes('multipart/form-data')) {
        return sendError(res, 400, 'Content-Type must be multipart/form-data');
      }

      const boundaryMatch = contentType.match(/boundary=([^;]+)/);
      if (!boundaryMatch) {
        return sendError(res, 400, 'No boundary found in Content-Type header');
      }

      const boundary = boundaryMatch[1];
      const parts = parseMultipartData(body, boundary);

      if (parts.length === 0) {
        return sendError(res, 400, 'No file parts found');
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
        return sendError(res, 400, 'No file found in request');
      }

      // Extract file information
      const contentDisposition = filePart.headers['content-disposition'];
      const contentType = filePart.headers['content-type'];
      const filename = extractFilename(contentDisposition);
      const fileBuffer = filePart.body;

      if (!filename || fileBuffer.length === 0) {
        return sendError(res, 400, 'Invalid file');
      }

      // Validate file
      if (!isAllowedFile(filename, contentType)) {
        return sendError(res, 400, 'File type not allowed');
      }

      // Security scan
      const scanResult = scanFileForMalware(fileBuffer, filename);

      if (!scanResult.safe) {
        return sendError(res, 400, `File rejected: ${scanResult.threats.join(', ')}`);
      }

      // Generate unique filename
      const sanitizedFilename = sanitizeFileName(filename);
      const fileHash = calculateFileHash(fileBuffer);
      const timestamp = Date.now();
      const uniqueFilename = `${timestamp}_${fileHash.substring(0, 8)}_${sanitizedFilename}`;
      const filePath = path.join(UPLOAD_DIR, uniqueFilename);

      // Save file
      fs.writeFileSync(filePath, fileBuffer);

      // Return success response
      const response = {
        success: true,
        file: {
          originalName: filename,
          savedName: uniqueFilename,
          size: fileBuffer.length,
          type: contentType,
          hash: fileHash,
          uploadTime: new Date().toISOString(),
          scanResult: {
            safe: scanResult.safe,
            risk: scanResult.risk,
            threats: scanResult.threats
          }
        }
      };

      sendResponse(res, 200, response);

    } catch (error) {
      console.error('Upload error:', error);
      sendError(res, 500, 'Upload failed');
    }
  });

  req.on('error', (error) => {
    console.error('Request error:', error);
    sendError(res, 500, 'Request error');
  });
}

async function handleListFiles(req, res) {
  try {
    const files = fs.readdirSync(UPLOAD_DIR);
    const fileList = files.map(filename => {
      const filePath = path.join(UPLOAD_DIR, filename);
      const stats = fs.statSync(filePath);
      
      return {
        name: filename,
        size: stats.size,
        uploadTime: stats.birthtime.toISOString(),
        modifiedTime: stats.mtime.toISOString()
      };
    });

    sendResponse(res, 200, { files: fileList });
  } catch (error) {
    console.error('Error listing files:', error);
    sendError(res, 500, 'Failed to list files');
  }
}

async function handleDeleteFile(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const filename = parsedUrl.query.filename;

  if (!filename) {
    return sendError(res, 400, 'Filename parameter required');
  }

  try {
    const filePath = path.join(UPLOAD_DIR, filename);
    
    if (!fs.existsSync(filePath)) {
      return sendError(res, 404, 'File not found');
    }

    fs.unlinkSync(filePath);
    sendResponse(res, 200, { message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    sendError(res, 500, 'Failed to delete file');
  }
}

// Main server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  try {
    switch (path) {
      case '/upload':
        handleUpload(req, res);
        break;
      case '/files':
        if (req.method === 'GET') {
          handleListFiles(req, res);
        } else {
          sendError(res, 405, 'Method not allowed');
        }
        break;
      case '/delete':
        if (req.method === 'DELETE') {
          handleDeleteFile(req, res);
        } else {
          sendError(res, 405, 'Method not allowed');
        }
        break;
      default:
        sendError(res, 404, 'Not found');
    }
  } catch (error) {
    console.error('Server error:', error);
    sendError(res, 500, 'Internal server error');
  }
});

server.listen(PORT, () => {
  console.log(`File Upload server running on port ${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  POST /upload - Upload a file`);
  console.log(`  GET /files - List uploaded files`);
  console.log(`  DELETE /delete?filename=<name> - Delete a file`);
  console.log(`\nUpload directory: ${UPLOAD_DIR}`);
  console.log(`Max file size: ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  console.log(`Allowed types: ${ALLOWED_EXTENSIONS.join(', ')}`);
});
