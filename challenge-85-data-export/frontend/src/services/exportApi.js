import axios from 'axios';
import { config } from '../config/env';

const apiClient = axios.create({
  baseURL: config.api.baseURL,
  timeout: 30000,
});

export const exportApi = {
  // Simple export
  exportData: async (format = 'csv', filters = {}) => {
    try {
      const params = { format, ...filters };
      const response = await apiClient.get(config.api.endpoints.export, {
        params,
        responseType: 'blob',
      });
      
      return response;
    } catch (error) {
      throw new Error(`Export failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Advanced export with job creation
  createExportJob: async (data) => {
    try {
      const response = await apiClient.post(config.api.endpoints.exportAdvanced, data);
      return response.data;
    } catch (error) {
      throw new Error(`Export job creation failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Get export job status
  getExportStatus: async (id) => {
    try {
      const response = await apiClient.get(config.api.endpoints.exportStatus(id));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get export status: ${error.response?.data?.message || error.message}`);
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await apiClient.get(config.api.endpoints.health);
      return response.data;
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  },
};