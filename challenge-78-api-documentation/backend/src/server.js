const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const config = require('./config');

// Start server
const server = app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
  console.log(`API Documentation available at http://localhost:${config.port}${config.docs.path}`);
  console.log(`API Documentation JSON available at http://localhost:${config.port}${config.docs.path}/json`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

module.exports = server;