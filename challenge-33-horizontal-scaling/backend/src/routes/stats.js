const express = require('express');
const router = express.Router();
const statsAggregator = require('../lib/statsAggregator');

// Get current stats
router.get('/', async (req, res) => {
  try {
    const stats = await statsAggregator.getCurrentStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Get historical stats
router.get('/history', async (req, res) => {
  try {
    const history = await statsAggregator.getStatsHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats history' });
  }
});

module.exports = router;