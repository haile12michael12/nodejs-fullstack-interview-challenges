const express = require('express');
const corsRoutes = require('../routes/cors.routes');
const { corsMiddleware, preflightHandler, corsSecurityMiddleware } = require('../middleware/cors.middleware');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(corsMiddleware);
app.use(preflightHandler);
app.use(corsSecurityMiddleware);

// Routes
app.use('/cors', corsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? {} : { message: err.message }
  });
});

module.exports = app;