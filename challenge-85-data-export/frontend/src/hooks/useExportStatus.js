import { useState, useEffect } from 'react';
import { exportApi } from '../services/exportApi';

export const useExportStatus = (jobId) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStatus = async () => {
    if (!jobId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await exportApi.getExportStatus(jobId);
      setStatus(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startPolling = (interval = 2000) => {
    const poll = setInterval(() => {
      fetchStatus();
    }, interval);

    return () => clearInterval(poll);
  };

  useEffect(() => {
    if (jobId) {
      fetchStatus();
    }
  }, [jobId]);

  return {
    status,
    loading,
    error,
    fetchStatus,
    startPolling,
  };
};