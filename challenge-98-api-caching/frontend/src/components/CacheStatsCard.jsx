import React, { useState, useEffect } from 'react';
import { getCacheStats, clearCache, resetCacheStats } from '../services/api';

const CacheStatsCard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await getCacheStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch cache stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearCache = async () => {
    try {
      await clearCache();
      fetchStats();
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  };

  const handleResetStats = async () => {
    try {
      await resetCacheStats();
      fetchStats();
    } catch (error) {
      console.error('Failed to reset stats:', error);
    }
  };

  if (loading && !stats) {
    return <div className="card">Loading cache stats...</div>;
  }

  return (
    <div className="card">
      <h2>Cache Statistics</h2>
      {stats && (
        <>
          <div className="stats-grid">
            <div className="stat-item">
              <label>Hits:</label>
              <span>{stats.hits}</span>
            </div>
            <div className="stat-item">
              <label>Misses:</label>
              <span>{stats.misses}</span>
            </div>
            <div className="stat-item">
              <label>Sets:</label>
              <span>{stats.sets}</span>
            </div>
            <div className="stat-item">
              <label>Current Size:</label>
              <span>{stats.size}</span>
            </div>
            <div className="stat-item">
              <label>Max Size:</label>
              <span>{stats.max}</span>
            </div>
          </div>
          <div className="button-group">
            <button onClick={handleClearCache}>Clear Cache</button>
            <button onClick={handleResetStats}>Reset Stats</button>
            <button onClick={fetchStats}>Refresh</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CacheStatsCard;