const http = require('http');
const config = require('./config');
const Router = require('./core/router');
const { sendError } = require('./core/response');
const { setupRoutes } = require('./routes');
const corsMiddleware = require('./middleware/cors');
const rateLimiter = require('./middleware/rateLimiter');
const logger = require('./utils/logger');

// Create router instance
const router = new Router();

// Setup middleware
router.use(logger);
router.use(corsMiddleware);
router.use(rateLimiter());

// Setup routes
setupRoutes(router);

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
  console.log(`  POST /logout - Logout`);
  console.log(`  GET /me - Get current user (requires token)`);
  console.log(`  GET /users - Get all users (requires token)`);
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
