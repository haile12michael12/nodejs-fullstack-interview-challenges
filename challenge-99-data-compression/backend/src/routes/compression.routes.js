const express = require('express');
const router = express.Router();
const { compressData, getStats } = require('../services/compressionService');
const { getCompressionStats } = require('../services/statsService');

// Compress data endpoint
router.post('/compress', async (req, res, next) => {
  try {
    const { data, algorithm } = req.body;
    const result = await compressData(data, algorithm);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Get compression stats
router.get('/stats', async (req, res, next) => {
  try {
    const stats = await getCompressionStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

module.exports = router;