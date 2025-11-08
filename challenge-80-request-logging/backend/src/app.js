const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { logger } = require('./config/logger.config');
const requestIdMiddleware = require('./middleware/requestId');
const responseTimerMiddleware = require('./middleware/responseTimer');
const requestLoggerMiddleware = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request ID middleware
app.use(requestIdMiddleware);

// Response timer middleware
app.use(responseTimerMiddleware);

// Request logging middleware
app.use(requestLoggerMiddleware);

// Logging middleware for application logs
app.use((req, res, next) => {
  logger.info('Incoming request', {
    requestId: req.id,
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  next();
});

// Routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  logger.warn('Route not found', {
    requestId: req.id,
    method: req.method,
    url: req.url
  });
  
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;