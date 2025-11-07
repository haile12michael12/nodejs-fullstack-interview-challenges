import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User validation
export const validateUser = async (userData) => {
  try {
    const response = await apiClient.post('/validate/user', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to validate user data');
  }
};

// Product validation
export const validateProduct = async (productData) => {
  try {
    const response = await apiClient.post('/validate/product', productData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to validate product data');
  }
};

// Get validation rules
export const getValidationRules = async () => {
  try {
    const response = await apiClient.get('/validation/rules');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch validation rules');
  }
};

// Create user
export const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/user', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create user');
  }
};

// Create product
export const createProduct = async (productData) => {
  try {
    const response = await apiClient.post('/product', productData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create product');
  }
};

export default apiClient;