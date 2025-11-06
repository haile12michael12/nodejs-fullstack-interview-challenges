import React, { useState, useEffect } from 'react';
import { getRateLimitConfig } from '../api/rateLimitApi';

const ConfigDisplay = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const data = await getRateLimitConfig();
      setConfig(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="card">Loading configuration...</div>;
  if (error) return <div className="card error">Error: {error}</div>;

  return (
    <div className="card">
      <h2>Rate Limit Configuration</h2>
      {config && (
        <div className="config-details">
          <div className="config-item">
            <strong>Window (ms):</strong> {config.windowMs}
          </div>
          <div className="config-item">
            <strong>Max Requests:</strong> {config.max}
          </div>
          <div className="config-item">
            <strong>Message:</strong> {config.message}
          </div>
          <div className="config-item">
            <strong>Standard Headers:</strong> {config.standardHeaders ? 'Yes' : 'No'}
          </div>
          <div className="config-item">
            <strong>Legacy Headers:</strong> {config.legacyHeaders ? 'Yes' : 'No'}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigDisplay;