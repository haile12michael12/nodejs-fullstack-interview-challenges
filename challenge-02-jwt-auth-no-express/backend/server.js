const http = require('http');
const config = require('./src/config');
const Router = require('./src/router');
const { sendError } = require('./src/utils/response');

// Create router instance
const router = new Router();

// Setup routes
router.setupRoutes();

// Main server
const server = http.createServer(async (req, res) => {
  try {
    await router.handleRequest(req, res);
  } catch (error) {
    console.error('Server error:', error);
    sendError(res, 500, 'Internal server error');
  }
});

server.listen(config.port, () => {
  console.log(`JWT Auth server running on port ${config.port}`);
  console.log(`Available endpoints:`);
  console.log(`  POST /login - Login with username/password`);
  console.log(`  POST /refresh - Refresh access token`);
  console.log(`  GET /me - Get current user (requires token)`);
  console.log(`  GET /protected - Protected endpoint (requires token)`);
  console.log(`\nTest users:`);
  console.log(`  admin / password123`);
  console.log(`  user / user123`);
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
