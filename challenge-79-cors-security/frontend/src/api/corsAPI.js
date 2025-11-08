import axios from 'axios';

// Create axios instance with base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: false // CORS credentials setting
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any request headers if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// CORS API functions
export const corsAPI = {
  // Get current CORS configuration
  getConfig: () => {
    return api.get('/cors/config');
  },

  // Update CORS configuration
  updateConfig: (config) => {
    return api.post('/cors/update', config);
  },

  // Get allowed origins
  getOrigins: () => {
    return api.get('/cors/origins');
  },

  // Add origin to whitelist
  addOrigin: (origin) => {
    return api.post('/cors/origins/add', { origin });
  },

  // Remove origin from whitelist
  removeOrigin: (origin) => {
    return api.post('/cors/origins/remove', { origin });
  },

  // Health check
  healthCheck: () => {
    return api.get('/health');
  }
};

export default corsAPI;