import axios from 'axios';

const API_BASE_URL = '/api/migrations';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMigrationStatus = async () => {
  try {
    const response = await api.get('/status');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch migration status');
  }
};

export const runMigrations = async () => {
  try {
    const response = await api.post('/run');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to run migrations');
  }
};

export const rollbackMigration = async () => {
  try {
    const response = await api.post('/rollback');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to rollback migration');
  }
};

export default api;