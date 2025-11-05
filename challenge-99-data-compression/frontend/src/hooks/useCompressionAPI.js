import { useState } from 'react';
import { compressText, getStats } from '../services/apiClient';

export const useCompressionAPI = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const compressTextHandler = async (text, algorithm) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await compressText(text, algorithm);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getStatsHandler = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const statsData = await getStats();
      setStats(statsData);
      return statsData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    compressText: compressTextHandler,
    getStats: getStatsHandler,
    stats,
    loading,
    error
  };
};