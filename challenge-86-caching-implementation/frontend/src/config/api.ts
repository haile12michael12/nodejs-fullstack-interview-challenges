const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    cache: {
      stats: '/cache/stats',
      invalidate: '/cache/invalidate',
      warm: '/cache/warm',
    },
    health: '/health',
  },
};