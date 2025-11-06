const express = require('express');
const router = express.Router();
const metricsRoutes = require('./metrics');
const performanceRoutes = require('./performance');
const slowQueriesRoutes = require('./slowQueries');

// Main routes
router.get('/', (req, res) => {
  res.json({ message: 'Performance Monitoring API' });
});

router.use('/metrics', metricsRoutes);
router.use('/performance', performanceRoutes);
router.use('/slow-queries', slowQueriesRoutes);

module.exports = router;