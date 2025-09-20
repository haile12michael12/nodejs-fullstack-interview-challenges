const { sendSuccess, sendError } = require('../utils/response');

async function handleApiData(req, res) {
  try {
    // Simulate some API work
    const data = {
      message: 'This is rate-limited API data',
      timestamp: new Date().toISOString(),
      requestId: Math.random().toString(36).substr(2, 9),
      data: {
        users: [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
        ],
        stats: {
          totalUsers: 2,
          activeUsers: 1,
          requestsToday: 42
        }
      }
    };

    sendSuccess(res, data);
  } catch (error) {
    sendError(res, 500, 'Failed to fetch API data', error.message);
  }
}

async function handleApiStatus(req, res) {
  try {
    const status = {
      service: 'Rate Limited API',
      version: '1.0.0',
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      timestamp: new Date().toISOString(),
      rateLimitInfo: {
        windowMs: 60000,
        maxRequests: 10,
        tokenBucketCapacity: 10,
        refillRate: 1
      }
    };

    sendSuccess(res, status);
  } catch (error) {
    sendError(res, 500, 'Failed to get API status', error.message);
  }
}

async function handleApiTest(req, res) {
  try {
    // Simulate different response times
    const delay = Math.random() * 1000;
    await new Promise(resolve => setTimeout(resolve, delay));

    const testData = {
      message: 'API test completed',
      delay: Math.round(delay),
      timestamp: new Date().toISOString(),
      random: Math.random()
    };

    sendSuccess(res, testData);
  } catch (error) {
    sendError(res, 500, 'API test failed', error.message);
  }
}

module.exports = {
  handleApiData,
  handleApiStatus,
  handleApiTest
};

