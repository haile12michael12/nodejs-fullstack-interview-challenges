const express = require('express');
const router = express.Router();
const { getMetrics, getContentType } = require('../metrics/prometheus');

// Get Prometheus metrics
router.get('/', async (req, res) => {
  try {
    const metrics = await getMetrics();
    res.set('Content-Type', getContentType());
    res.send(metrics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to collect metrics' });
  }
});

// Get custom metrics
router.get('/custom', (req, res) => {
  res.json({
    message: 'Custom metrics endpoint',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;