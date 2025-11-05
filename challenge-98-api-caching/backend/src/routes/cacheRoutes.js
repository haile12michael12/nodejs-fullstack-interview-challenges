const express = require('express');
const router = express.Router();
const { getCacheStats, clearCache, resetCacheStats } = require('../controllers/cacheController');

// Get cache statistics
router.get('/stats', getCacheStats);

// Clear cache
router.delete('/clear', clearCache);

// Reset cache statistics
router.delete('/stats/reset', resetCacheStats);

module.exports = router;