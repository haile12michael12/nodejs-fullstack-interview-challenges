import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Upload a file
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to upload file');
  }
};

// Get list of files
export const getFiles = async () => {
  try {
    const response = await apiClient.get('/files');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch files');
  }
};

// Get file by ID
export const getFile = async (id) => {
  try {
    const response = await apiClient.get(`/files/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch file');
  }
};

// Delete file by ID
export const deleteFile = async (id) => {
  try {
    const response = await apiClient.delete(`/files/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete file');
  }
};

export default apiClient;