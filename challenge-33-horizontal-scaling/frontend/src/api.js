const API_BASE_URL = '/api';

export const getHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) throw new Error('Failed to fetch health data');
    return response.json();
  } catch (error) {
    throw new Error(`Health check failed: ${error.message}`);
  }
};

export const getStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  } catch (error) {
    throw new Error(`Stats fetch failed: ${error.message}`);
  }
};

export const getSession = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/session`);
    if (!response.ok) throw new Error('Failed to fetch session');
    return response.json();
  } catch (error) {
    throw new Error(`Session fetch failed: ${error.message}`);
  }
};

export const createSession = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create session');
    return response.json();
  } catch (error) {
    throw new Error(`Session creation failed: ${error.message}`);
  }
};

export const updateSession = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/session`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update session');
    return response.json();
  } catch (error) {
    throw new Error(`Session update failed: ${error.message}`);
  }
};

export const deleteSession = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/session`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete session');
    return response.json();
  } catch (error) {
    throw new Error(`Session deletion failed: ${error.message}`);
  }
};