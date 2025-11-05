const { getStats, clear, resetStats } = require('../cache/cacheStore');
const { sendSuccess, sendError } = require('../utils/responseUtils');

const getCacheStats = (req, res) => {
  try {
    const stats = getStats();
    sendSuccess(res, stats);
  } catch (error) {
    sendError(res, 'Failed to get cache stats', 500);
  }
};

const clearCache = (req, res) => {
  try {
    clear();
    sendSuccess(res, { message: 'Cache cleared successfully' });
  } catch (error) {
    sendError(res, 'Failed to clear cache', 500);
  }
};

const resetCacheStats = (req, res) => {
  try {
    resetStats();
    sendSuccess(res, { message: 'Cache stats reset successfully' });
  } catch (error) {
    sendError(res, 'Failed to reset cache stats', 500);
  }
};

module.exports = {
  getCacheStats,
  clearCache,
  resetCacheStats
};