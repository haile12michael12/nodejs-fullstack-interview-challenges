const healthService = require('./healthService');

const getHealthStatus = async (req, res) => {
  try {
    const healthData = await healthService.checkHealth();
    res.status(200).json(healthData);
  } catch (error) {
    res.status(503).json({ 
      status: 'unhealthy', 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};

const getDetailedHealth = async (req, res) => {
  try {
    const detailedHealth = await healthService.checkDetailedHealth();
    res.status(200).json(detailedHealth);
  } catch (error) {
    res.status(503).json({ 
      status: 'unhealthy', 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};

module.exports = {
  getHealthStatus,
  getDetailedHealth
};