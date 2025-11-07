import { useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';

const useSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);

  const search = async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.get('/search', { params });
      setResults(response.data.data);
      setMeta(response.data.meta);
    } catch (err) {
      setError(err.message || 'An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  const advancedSearch = async (criteria = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.post('/search/advanced', criteria);
      setResults(response.data.data);
      setMeta({ total: response.data.meta?.total });
    } catch (err) {
      setError(err.message || 'An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    meta,
    search,
    advancedSearch,
  };
};

export default useSearch;