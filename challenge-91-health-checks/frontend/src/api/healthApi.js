import axios from 'axios';

const API_BASE_URL = '/api/health';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getHealthStatus = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch health status');
  }
};

export const getDetailedHealth = async () => {
  try {
    const response = await api.get('/detailed');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch detailed health');
  }
};

export const getReadiness = async () => {
  try {
    const response = await api.get('/ready');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch readiness status');
  }
};

export const getLiveness = async () => {
  try {
    const response = await api.get('/alive');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch liveness status');
  }
};

export default api;