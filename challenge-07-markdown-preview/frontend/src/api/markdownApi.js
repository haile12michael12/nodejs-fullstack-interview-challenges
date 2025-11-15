const API_BASE = '/api';

export async function renderMarkdown(markdown) {
  const response = await fetch(`${API_BASE}/render`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ markdown }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to render markdown');
  }

  return await response.json();
}