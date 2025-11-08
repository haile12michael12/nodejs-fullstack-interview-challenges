import axios from 'axios';

// Create axios instance with base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add request ID
api.interceptors.request.use(
  (config) => {
    // Generate a unique request ID for tracking
    const requestId = 'req-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    config.headers['X-Request-ID'] = requestId;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Log API functions
export const logApi = {
  // Get all request logs
  getLogs: (filters = {}) => {
    return api.get('/logs/requests', { params: filters });
  },

  // Get a specific request log by ID
  getLogById: (id) => {
    return api.get(`/logs/requests/${id}`);
  },

  // Search logs by criteria
  searchLogs: (criteria) => {
    return api.post('/logs/search', criteria);
  },

  // Get log statistics
  getStats: () => {
    return api.get('/logs/stats');
  },

  // Get performance data
  getPerformance: (filters = {}) => {
    return api.get('/logs/performance', { params: filters });
  }
};

export default logApi;