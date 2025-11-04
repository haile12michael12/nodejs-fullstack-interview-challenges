const API_BASE_URL = '/api';

export const fetchMetrics = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/metrics`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching metrics:', error);
    throw error;
  }
};