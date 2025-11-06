import { useState, useEffect } from 'react';
import { cacheService } from '../services/cacheService';
import { ICacheStats } from '../../../core/interfaces/ICacheStats';

export const useCacheData = () => {
  const [stats, setStats] = useState<ICacheStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await cacheService.getStats();
      setStats(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cache statistics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const invalidateCache = async (pattern?: string) => {
    try {
      await cacheService.invalidateCache(pattern);
      await fetchStats(); // Refresh stats after invalidation
    } catch (err) {
      setError('Failed to invalidate cache');
      console.error(err);
    }
  };

  const warmCache = async (data: Record<string, any>) => {
    try {
      await cacheService.warmCache(data);
      await fetchStats(); // Refresh stats after warming
    } catch (err) {
      setError('Failed to warm cache');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    fetchStats,
    invalidateCache,
    warmCache,
  };
};