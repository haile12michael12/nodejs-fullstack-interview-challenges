import axios from 'axios';

// Create axios instance with base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add authorization header if token exists
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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

// API functions
export const apiClient = {
  // Get API documentation
  getDocumentation: () => {
    return api.get('/docs/json');
  },

  // Get health status
  getHealth: () => {
    return api.get('/api/health');
  },

  // User endpoints
  getUsers: () => {
    return api.get('/api/users');
  },

  getUser: (id) => {
    return api.get(`/api/users/${id}`);
  },

  createUser: (userData) => {
    return api.post('/api/users', userData);
  },

  updateUser: (id, userData) => {
    return api.put(`/api/users/${id}`, userData);
  },

  deleteUser: (id) => {
    return api.delete(`/api/users/${id}`);
  },

  // Product endpoints
  getProducts: () => {
    return api.get('/api/products');
  },

  getProduct: (id) => {
    return api.get(`/api/products/${id}`);
  },

  createProduct: (productData) => {
    return api.post('/api/products', productData);
  },

  updateProduct: (id, productData) => {
    return api.put(`/api/products/${id}`, productData);
  },

  deleteProduct: (id) => {
    return api.delete(`/api/products/${id}`);
  }
};

export default apiClient;