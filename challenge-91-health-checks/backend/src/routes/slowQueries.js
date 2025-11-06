const express = require('express');
const router = express.Router();
const dbMonitor = require('../metrics/dbMonitor');

// Get slow queries
router.get('/', (req, res) => {
  try {
    const slowQueries = dbMonitor.getSlowQueries();
    res.json(slowQueries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve slow queries' });
  }
});

// Clear slow queries
router.delete('/', (req, res) => {
  try {
    dbMonitor.clearSlowQueries();
    res.json({ message: 'Slow queries cleared' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear slow queries' });
  }
});

module.exports = router;