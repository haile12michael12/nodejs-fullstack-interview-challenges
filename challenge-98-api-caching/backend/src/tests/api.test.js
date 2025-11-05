const { getData } = require('../controllers/dataController');

describe('API Controller', () => {
  test('should return mock data', () => {
    // Mock response object
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    
    // Mock request object
    const mockReq = {};
    
    getData(mockReq, mockRes);
    
    // Wait for the async operation to complete
    setTimeout(() => {
      expect(mockRes.json).toHaveBeenCalled();
      const response = mockRes.json.mock.calls[0][0];
      expect(response).toHaveProperty('data');
      expect(response).toHaveProperty('timestamp');
      expect(response).toHaveProperty('count');
      expect(response.count).toBe(50);
    }, 150);
  });
});