const express = require('express');
const router = express.Router();

// Get memory statistics
router.get('/', (req, res) => {
  const memoryUsage = process.memoryUsage();
  const heapStats = {
    rss: memoryUsage.rss,
    heapTotal: memoryUsage.heapTotal,
    heapUsed: memoryUsage.heapUsed,
    external: memoryUsage.external,
    arrayBuffers: memoryUsage.arrayBuffers
  };
  
  res.json({
    timestamp: new Date().toISOString(),
    pid: process.pid,
    memory: heapStats,
    os: {
      totalMemory: require('os').totalmem(),
      freeMemory: require('os').freemem(),
      loadAverage: require('os').loadavg()
    }
  });
});

module.exports = router;