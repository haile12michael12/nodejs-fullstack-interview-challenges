import axios from 'axios';
import { apiConfig } from '../../../config/api';
import { ICacheStats } from '../../../core/interfaces/ICacheStats';

const apiClient = axios.create({
  baseURL: apiConfig.baseURL,
});

export const cacheService = {
  getStats: async (): Promise<ICacheStats> => {
    try {
      const response = await apiClient.get(apiConfig.endpoints.cache.stats);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching cache stats:', error);
      throw error;
    }
  },

  invalidateCache: async (pattern?: string): Promise<void> => {
    try {
      await apiClient.post(apiConfig.endpoints.cache.invalidate, { pattern });
    } catch (error) {
      console.error('Error invalidating cache:', error);
      throw error;
    }
  },

  warmCache: async (data: Record<string, any>): Promise<void> => {
    try {
      await apiClient.post(apiConfig.endpoints.cache.warm, { data });
    } catch (error) {
      console.error('Error warming cache:', error);
      throw error;
    }
  },
};