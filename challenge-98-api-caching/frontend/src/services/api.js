const API_BASE_URL = '/api';

export const getCacheStats = async () => {
  const response = await fetch(`${API_BASE_URL}/cache/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch cache stats');
  }
  return response.json();
};

export const clearCache = async () => {
  const response = await fetch(`${API_BASE_URL}/cache/clear`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to clear cache');
  }
  return response.json();
};

export const resetCacheStats = async () => {
  const response = await fetch(`${API_BASE_URL}/cache/stats/reset`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to reset cache stats');
  }
  return response.json();
};

export const fetchData = async () => {
  const response = await fetch(`${API_BASE_URL}/data/items`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};