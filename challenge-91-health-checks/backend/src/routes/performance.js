const express = require('express');
const router = express.Router();
const PerformanceTracker = require('../metrics/performanceTracker');

// Get performance metrics
router.get('/', (req, res) => {
  try {
    const metrics = PerformanceTracker.getPerformanceMetrics();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to collect performance metrics' });
  }
});

module.exports = router;