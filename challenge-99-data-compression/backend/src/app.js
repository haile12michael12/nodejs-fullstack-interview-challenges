const express = require('express');
const cors = require('cors');
const compression = require('compression');
const { compressionConfig } = require('./config');
const compressionMiddleware = require('./middlewares/compressionMiddleware');
const requestLogger = require('./middlewares/requestLogger');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(compression(compressionConfig));

// Custom compression middleware
app.use(compressionMiddleware);

// Routes
app.use('/', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;