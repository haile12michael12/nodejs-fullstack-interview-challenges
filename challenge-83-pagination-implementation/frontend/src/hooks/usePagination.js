import { useState, useEffect } from 'react';
import { itemApi } from '../lib/api';

export const usePagination = (initialPage = 1, initialLimit = 10) => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const fetchItems = async (pageNum = page, limitNum = limit) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await itemApi.getItems({
        page: pageNum,
        limit: limitNum,
      });
      
      setData(response.data);
      setMeta(response.meta);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (pageNum) => {
    setPage(pageNum);
    fetchItems(pageNum, limit);
  };

  const changeLimit = (newLimit) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing limit
    fetchItems(1, newLimit);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    data,
    meta,
    loading,
    error,
    page,
    limit,
    goToPage,
    changeLimit,
    refetch: fetchItems,
  };
};