const express = require('express');
const router = express.Router();
const gcManager = require('../lib/gcManager');

// Trigger garbage collection
router.post('/', async (req, res) => {
  try {
    // Force garbage collection
    const gcResult = await gcManager.forceGC();
    
    res.json({
      message: 'Garbage collection triggered',
      gcResult,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to trigger garbage collection: ${error.message}` });
  }
});

module.exports = router;