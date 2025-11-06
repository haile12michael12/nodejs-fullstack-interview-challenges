const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    workerId: process.pid,
    timestamp: new Date().toISOString()
  });
});

// Detailed health check
router.get('/detailed', (req, res) => {
  const memoryUsage = process.memoryUsage();
  const cpuUsage = process.cpuUsage();
  
  res.json({
    status: 'healthy',
    workerId: process.pid,
    timestamp: new Date().toISOString(),
    memory: memoryUsage,
    cpu: cpuUsage,
    uptime: process.uptime()
  });
});

module.exports = router;