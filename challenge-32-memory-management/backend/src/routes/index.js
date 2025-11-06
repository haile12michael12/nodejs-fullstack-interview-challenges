const express = require('express');
const router = express.Router();

const memoryStatsRoutes = require('./memoryStats');
const allocateRoutes = require('./allocate');
const leakRoutes = require('./leak');
const cleanupRoutes = require('./cleanup');

// Route middleware
router.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Mount routes
router.use('/memory-stats', memoryStatsRoutes);
router.use('/allocate', allocateRoutes);
router.use('/leak', leakRoutes);
router.use('/cleanup', cleanupRoutes);

// Root endpoint
router.get('/', (req, res) => {
  res.json({ 
    message: 'Memory Management API',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;