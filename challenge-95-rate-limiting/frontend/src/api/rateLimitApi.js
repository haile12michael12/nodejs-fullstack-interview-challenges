import axios from 'axios';

const API_BASE_URL = '/api/rate-limit';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getRateLimitConfig = async () => {
  try {
    const response = await api.get('/config');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch rate limit config');
  }
};

export const getRateLimitStatus = async () => {
  try {
    const response = await api.get('/status');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch rate limit status');
  }
};

export const resetRateLimit = async (ip) => {
  try {
    const response = await api.post(`/reset/${ip}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to reset rate limit');
  }
};

export default api;