const express = require('express');
const logRoutes = require('./log.routes');

const router = express.Router();

// Register all module routes
router.use('/logs', logRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;