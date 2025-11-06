const express = require('express');
const router = express.Router();
const { getHealthStatus, getDetailedHealth } = require('./healthController');

// Basic health check endpoint
router.get('/', getHealthStatus);

// Detailed health check endpoint
router.get('/detailed', getDetailedHealth);

// Readiness check endpoint
router.get('/ready', async (req, res) => {
  const healthService = require('./healthService');
  const readiness = await healthService.checkReadiness();
  
  if (readiness.ready) {
    res.status(200).json({ status: 'ready', ...readiness });
  } else {
    res.status(503).json({ status: 'not ready', ...readiness });
  }
});

// Liveness check endpoint
router.get('/alive', (req, res) => {
  res.status(200).json({ status: 'alive', timestamp: new Date().toISOString() });
});

module.exports = router;