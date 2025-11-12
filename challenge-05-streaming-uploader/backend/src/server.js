// Main server file
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const appConfig = require('./config/appConfig');
const { setupRoutes } = require('./routes/uploadRoutes');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(appConfig.uploadDir)) {
  fs.mkdirSync(appConfig.uploadDir, { recursive: true });
}

class Server {
  constructor() {
    this.routes = new Map();
    this.server = http.createServer(this.handleRequest.bind(this));
  }

  route(path, handler, method = 'ALL') {
    const key = `${method}:${path}`;
    this.routes.set(key, handler);
  }

  handleRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      return res.end();
    }

    try {
      // Try exact match first
      const exactKey = `${method}:${path}`;
      const wildcardKey = `ALL:${path}`;
      
      let handler = this.routes.get(exactKey) || this.routes.get(wildcardKey);
      
      if (handler) {
        handler(req, res);
      } else {
        // Send 404
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
      }
    } catch (error) {
      console.error('Server error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }
}

// Create and start server
const server = new Server();

// Setup routes
setupRoutes(server);

server.listen(appConfig.port, () => {
  console.log(`Streaming File Upload server running on port ${appConfig.port}`);
  console.log(`Available endpoints:`);
  console.log(`  POST /upload - Upload a file`);
  console.log(`  GET /files - List uploaded files`);
  console.log(`  DELETE /delete?filename=<name> - Delete a file`);
  console.log(`\nUpload directory: ${path.resolve(appConfig.uploadDir)}`);
  console.log(`Max file size: ${appConfig.maxFileSize / 1024 / 1024}MB`);
  console.log(`Allowed types: ${appConfig.allowedExtensions.join(', ')}`);
});

module.exports = Server;