import { useState, useEffect } from 'react';
import { getImportStatus } from '../api/importApi';

const useImportStatus = (importId) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!importId) return;

    const fetchStatus = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getImportStatus(importId);
        setStatus(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [importId]);

  return { status, loading, error };
};

export default useImportStatus;