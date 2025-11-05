const API_BASE_URL = '/api/compression';

export const compressText = async (text, algorithm) => {
  const response = await fetch(`${API_BASE_URL}/compress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: text, algorithm }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to compress text');
  }

  return await response.json();
};

export const getStats = async () => {
  const response = await fetch(`${API_BASE_URL}/stats`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch stats');
  }

  return await response.json();
};