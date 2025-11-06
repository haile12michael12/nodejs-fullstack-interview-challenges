import axios from 'axios';

const API_BASE_URL = '/api/security';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSecurityConfig = async () => {
  try {
    const response = await api.get('/config');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch security config');
  }
};

export const getSecurityStatus = async () => {
  try {
    const response = await api.get('/status');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch security status');
  }
};

export const updateSecurityConfig = async (config) => {
  try {
    const response = await api.post('/config', config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update security config');
  }
};

export default api;