const express = require('express');
const cors = require('cors');
const path = require('path');
const uploadRoutes = require('./routes/uploads');
const errorHandler = require('./middleware/errorHandler');
const uploadRateLimiter = require('./middleware/rateLimiter');
const config = require('./config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(config.upload.directory));

// Routes
app.use('/upload', uploadRateLimiter, uploadRoutes);
app.use('/files', uploadRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const server = app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
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

module.exports = app;