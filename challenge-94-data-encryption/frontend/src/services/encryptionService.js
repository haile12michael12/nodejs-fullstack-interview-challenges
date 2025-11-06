import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const encryptData = async (data) => {
  try {
    const response = await api.post('/encrypt', { data });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to encrypt data');
  }
};

export const decryptData = async (encryptedData, iv) => {
  try {
    const response = await api.post('/decrypt', { encryptedData, iv });
    return response.data.decryptedData;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to decrypt data');
  }
};

export const listKeys = async () => {
  try {
    const response = await api.get('/keys');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to list keys');
  }
};

export const rotateKey = async () => {
  try {
    const response = await api.post('/rotate-key');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to rotate key');
  }
};

export default api;