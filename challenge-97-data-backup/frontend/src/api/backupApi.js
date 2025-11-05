import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getBackups = async () => {
  try {
    const response = await api.get('/backups');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch backups');
  }
};

export const createBackup = async (backupData) => {
  try {
    const response = await api.post('/backups', backupData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to create backup');
  }
};

export const restoreBackup = async (filename) => {
  try {
    const response = await api.post(`/backups/${filename}/restore`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to restore backup');
  }
};

export const deleteBackup = async (filename) => {
  try {
    const response = await api.delete(`/backups/${filename}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete backup');
  }
};

export default api;