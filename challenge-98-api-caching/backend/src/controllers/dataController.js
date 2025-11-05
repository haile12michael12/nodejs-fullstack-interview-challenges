const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');

// Mock data store
let mockData = [];

// Initialize mock data
const initializeMockData = () => {
  for (let i = 1; i <= 50; i++) {
    mockData.push({
      id: uuidv4(),
      name: `Item ${i}`,
      description: `Description for item ${i}`,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
    });
  }
};

// Initialize data on first load
initializeMockData();

const getData = (req, res) => {
  try {
    // Simulate some processing delay
    const delay = Math.random() * 100;
    setTimeout(() => {
      logger.info('Data retrieved', { itemCount: mockData.length });
      res.json({
        data: mockData,
        timestamp: new Date().toISOString(),
        count: mockData.length
      });
    }, delay);
  } catch (error) {
    logger.error('Error retrieving data', { error: error.message });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getData };