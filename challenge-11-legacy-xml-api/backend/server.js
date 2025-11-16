const http = require('http');
const url = require('url');
const xmlOnly = require('./middleware/xmlOnly');
const { logXmlRequest } = require('./utils/logger');
const rateLimiter = require('./utils/rateLimiter');
const productRoutes = require('./routes/productRoutes');

const PORT = process.env.PORT || 3000;

// Main server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  console.log(`${method} ${pathname}`);

  try {
    // Apply middleware
    xmlOnly(req, res, () => {
      logXmlRequest(req, res, () => {
        rateLimiter()(req, res, () => {
          try {
            // CORS headers for frontend
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

            // Handle preflight requests
            if (method === 'OPTIONS') {
              res.writeHead(200);
              res.end();
              return;
            }

            // Handle product routes
            const handled = productRoutes(req, res, pathname, method);
            
            // Default 404 if route not handled
            if (!handled) {
              res.writeHead(404, { 'Content-Type': 'application/xml' });
              res.end(`<?xml version="1.0" encoding="UTF-8"?>
<error>
  <code>404</code>
  <message>Not found</message>
</error>`);
            }
          } catch (error) {
            console.error('Server error:', error);
            res.writeHead(500, { 'Content-Type': 'application/xml' });
            res.end(`<?xml version="1.0" encoding="UTF-8"?>
<error>
  <code>500</code>
  <message>Internal server error</message>
</error>`);
          }
        });
      });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500, { 'Content-Type': 'application/xml' });
    res.end(`<?xml version="1.0" encoding="UTF-8"?>
<error>
  <code>500</code>
  <message>Internal server error</message>
</error>`);
  }
});

server.listen(PORT, () => {
  console.log(`Legacy XML API server running on port ${PORT}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET /api/products - Get all products`);
  console.log(`  POST /api/products - Create new product`);
  console.log(`  GET /api/products/{id} - Get product by ID`);
  console.log(`  PUT /api/products/{id} - Update product by ID`);
  console.log(`  DELETE /api/products/{id} - Delete product by ID`);
  console.log(`\nAll requests and responses use Content-Type: application/xml`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down server...');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    process.exit(0);
  });
});