import React, { useState, useEffect } from 'react';

const API_BASE_URL = '/api';

const MemoryDashboard = () => {
  const [memoryStats, setMemoryStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMemoryStats();
    const interval = setInterval(fetchMemoryStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchMemoryStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/memory-stats`);
      if (!response.ok) throw new Error('Failed to fetch memory stats');
      const data = await response.json();
      setMemoryStats(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAllocateMemory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/allocate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ size: 1000, count: 10 })
      });
      if (!response.ok) throw new Error('Failed to allocate memory');
      await fetchMemoryStats();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLeak = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/leak`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: 50 })
      });
      if (!response.ok) throw new Error('Failed to create leak');
      await fetchMemoryStats();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCleanup = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/cleanup`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to cleanup');
      await fetchMemoryStats();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
        <h2>Memory Statistics</h2>
        {memoryStats ? (
          <div>
            <p><strong>RSS:</strong> {formatBytes(memoryStats.memory.rss)}</p>
            <p><strong>Heap Total:</strong> {formatBytes(memoryStats.memory.heapTotal)}</p>
            <p><strong>Heap Used:</strong> {formatBytes(memoryStats.memory.heapUsed)}</p>
            <p><strong>External:</strong> {formatBytes(memoryStats.memory.external)}</p>
            <p><strong>Timestamp:</strong> {new Date(memoryStats.timestamp).toLocaleString()}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={handleAllocateMemory} disabled={loading}>
          {loading ? 'Allocating...' : 'Allocate Memory'}
        </button>
        <button onClick={handleCreateLeak} disabled={loading}>
          {loading ? 'Creating Leak...' : 'Create Memory Leak'}
        </button>
        <button onClick={handleCleanup} disabled={loading}>
          {loading ? 'Cleaning...' : 'Force GC'}
        </button>
      </div>
    </div>
  );
};

export default MemoryDashboard;