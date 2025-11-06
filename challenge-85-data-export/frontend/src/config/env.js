const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const config = {
  api: {
    baseURL: API_BASE_URL,
    endpoints: {
      export: '/export',
      exportAdvanced: '/export/advanced',
      exportStatus: (id) => `/export/status/${id}`,
      health: '/health',
    },
  },
};