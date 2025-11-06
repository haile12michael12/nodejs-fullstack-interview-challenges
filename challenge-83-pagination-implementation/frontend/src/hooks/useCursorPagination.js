import { useState, useEffect } from 'react';
import { itemApi } from '../lib/api';

export const useCursorPagination = (initialLimit = 10) => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(initialLimit);
  const [cursors, setCursors] = useState({
    start: null,
    end: null,
  });

  const fetchItems = async (cursorParams = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        limit,
        ...cursorParams,
      };
      
      const response = await itemApi.getItems(params);
      
      setData(response.data);
      setMeta(response.meta);
      
      // Update cursors for navigation
      if (response.meta.cursors) {
        setCursors({
          start: response.meta.cursors.startCursor,
          end: response.meta.cursors.endCursor,
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const goToNextPage = () => {
    if (cursors.end) {
      fetchItems({ after: cursors.end });
    }
  };

  const goToPreviousPage = () => {
    if (cursors.start) {
      fetchItems({ before: cursors.start });
    }
  };

  const changeLimit = (newLimit) => {
    setLimit(newLimit);
    fetchItems({ limit: newLimit });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    data,
    meta,
    loading,
    error,
    limit,
    cursors,
    goToNextPage,
    goToPreviousPage,
    changeLimit,
    refetch: fetchItems,
    hasNextPage: meta?.cursors?.hasNextPage,
    hasPreviousPage: meta?.cursors?.hasPreviousPage,
  };
};