import React, { useState } from 'react';
import { fetchData } from '../services/api';

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchData();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Data Fetcher</h2>
      <div className="button-group">
        <button onClick={handleFetchData} disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch Data'}
        </button>
      </div>
      
      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}
      
      {data && (
        <div className="data-display">
          <p><strong>Items Count:</strong> {data.count}</p>
          <p><strong>Timestamp:</strong> {data.timestamp}</p>
          <div className="items-list">
            <h3>First 5 Items:</h3>
            {data.data.slice(0, 5).map(item => (
              <div key={item.id} className="item-preview">
                <strong>{item.name}</strong>: {item.description}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataFetcher;