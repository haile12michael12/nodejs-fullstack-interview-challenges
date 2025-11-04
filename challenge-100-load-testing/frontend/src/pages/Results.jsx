import React, { useState, useEffect } from 'react';
import { fetchMetrics } from '../services/api';

const Results = () => {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await fetchMetrics();
        setMetrics(data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="results">
      <h1>Test Results</h1>
      <div className="metrics-list">
        {metrics.map((metric) => (
          <div key={metric.id} className="metric-item">
            <div>Timestamp: {metric.timestamp}</div>
            <div>Response Time: {metric.responseTime.toFixed(2)}ms</div>
            <div>Status: {metric.statusCode}</div>
            <div>Data Size: {metric.dataSize} bytes</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;