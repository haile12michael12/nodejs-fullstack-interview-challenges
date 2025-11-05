const express = require('express');
const cors = require('cors');
const cacheMiddleware = require('./cache/cacheMiddleware');
const cacheRoutes = require('./routes/cacheRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cacheMiddleware);

// Routes
app.use('/api/cache', cacheRoutes);
app.use('/api/data', apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

module.exports = app;