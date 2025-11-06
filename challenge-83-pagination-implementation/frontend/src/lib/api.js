import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const itemApi = {
  // Get paginated items
  getItems: async (params = {}) => {
    try {
      const response = await apiClient.get('/items', { params });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch items: ${error.response?.data?.message || error.message}`);
    }
  },

  // Get item count
  getItemCount: async () => {
    try {
      const response = await apiClient.get('/items/count');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch item count: ${error.response?.data?.message || error.message}`);
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  },
};

export default apiClient;