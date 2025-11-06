import axios from 'axios';

const API_BASE_URL = '/api/import';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Upload file
export const uploadFile = async (file, options = {}) => {
  const formData = new FormData();
  formData.append('file', file);
  
  Object.keys(options).forEach(key => {
    formData.append(key, options[key]);
  });
  
  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to upload file');
  }
};

// Get import status
export const getImportStatus = async (importId) => {
  try {
    const response = await api.get(`/status/${importId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to get import status');
  }
};

// Get import errors
export const getImportErrors = async (importId) => {
  try {
    const response = await api.get(`/errors/${importId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to get import errors');
  }
};

// Download template
export const downloadTemplate = async (type) => {
  try {
    const response = await api.get(`/template/${type}`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to download template');
  }
};

// List imports
export const listImports = async () => {
  try {
    const response = await api.get('/imports');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to list imports');
  }
};

export default api;