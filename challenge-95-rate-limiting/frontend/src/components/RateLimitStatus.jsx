import React, { useState, useEffect } from 'react';
import { getRateLimitStatus, resetRateLimit } from '../api/rateLimitApi';

const RateLimitStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ip, setIp] = useState('');

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const data = await getRateLimitStatus();
      setStatus(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (!ip) {
      setError('Please enter an IP address');
      return;
    }
    
    try {
      await resetRateLimit(ip);
      fetchStatus(); // Refresh status
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="card">Loading status...</div>;
  if (error) return <div className="card error">Error: {error}</div>;

  return (
    <div className="card">
      <h2>Rate Limit Status</h2>
      {status && (
        <div className="status-details">
          <div className="status-item">
            <strong>Status:</strong> {status.status}
          </div>
          <div className="status-item">
            <strong>Current Usage:</strong> {status.currentUsage}
          </div>
          <div className="status-item">
            <strong>Limit:</strong> {status.limit}
          </div>
          <div className="status-item">
            <strong>Window (ms):</strong> {status.windowMs}
          </div>
        </div>
      )}
      
      <form onSubmit={handleReset} className="reset-form">
        <div className="form-group">
          <label htmlFor="ip">IP Address:</label>
          <input
            type="text"
            id="ip"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="Enter IP address"
          />
        </div>
        <button type="submit">Reset Rate Limit</button>
      </form>
    </div>
  );
};

export default RateLimitStatus;