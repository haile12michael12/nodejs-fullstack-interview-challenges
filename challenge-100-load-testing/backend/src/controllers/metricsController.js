const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');

const getMetrics = (req, res) => {
  try {
    // Simulate some processing time
    const processingTime = Math.random() * 100;
    
    // Generate mock metrics data
    const metrics = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      responseTime: processingTime,
      statusCode: 200,
      dataSize: Math.floor(Math.random() * 1000) + 100,
      userAgent: req.get('User-Agent') || 'unknown',
      endpoint: '/api/metrics'
    };

    logger.info('Metrics retrieved', { metrics });
    res.json(metrics);
  } catch (error) {
    logger.error('Error retrieving metrics', { error: error.message });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getMetrics };