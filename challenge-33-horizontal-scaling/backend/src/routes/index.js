const express = require('express');
const router = express.Router();

const healthRoutes = require('./health');
const statsRoutes = require('./stats');
const scaleRoutes = require('./scale');
const sessionRoutes = require('./session');

// Route middleware
router.use((req, res, next) => {
  console.log(`Worker ${process.pid}: ${req.method} ${req.path}`);
  next();
});

// Mount routes
router.use('/health', healthRoutes);
router.use('/stats', statsRoutes);
router.use('/scale', scaleRoutes);
router.use('/session', sessionRoutes);

// Root endpoint
router.get('/', (req, res) => {
  res.json({ 
    message: 'Horizontal Scaling API',
    workerId: process.pid,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;