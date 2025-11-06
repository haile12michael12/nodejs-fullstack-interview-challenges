import React, { useState, useEffect } from 'react';
import { getHealthStatus, getDetailedHealth, getReadiness, getLiveness } from '../api/healthApi';

const HealthStatus = () => {
  const [healthData, setHealthData] = useState(null);
  const [detailedData, setDetailedData] = useState(null);
  const [readinessData, setReadinessData] = useState(null);
  const [livenessData, setLivenessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [health, detailed, readiness, liveness] = await Promise.all([
        getHealthStatus(),
        getDetailedHealth(),
        getReadiness(),
        getLiveness()
      ]);
      setHealthData(health);
      setDetailedData(detailed);
      setReadinessData(readiness);
      setLivenessData(liveness);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading && !healthData) return <div className="card">Loading health data...</div>;
  if (error) return <div className="card error">Error: {error}</div>;

  return (
    <div className="dashboard">
      <div className="card">
        <h2>Health Status</h2>
        {healthData && (
          <div className="health-summary">
            <div className={`status-indicator ${healthData.status === 'healthy' ? 'healthy' : 'unhealthy'}`}>
              Status: {healthData.status}
            </div>
            <p>Timestamp: {new Date(healthData.timestamp).toLocaleString()}</p>
          </div>
        )}
      </div>

      <div className="card">
        <h2>System Information</h2>
        {detailedData && detailedData.system && (
          <div className="system-info">
            <p>Uptime: {Math.floor(detailedData.system.uptime)} seconds</p>
            <p>Platform: {detailedData.platform} ({detailedData.arch})</p>
            <p>Node.js: {detailedData.nodeVersion}</p>
            <p>Version: {detailedData.version}</p>
          </div>
        )}
      </div>

      <div className="card">
        <h2>Memory Usage</h2>
        {detailedData && detailedData.system && detailedData.system.memoryUsage && (
          <div className="memory-info">
            <p>RSS: {formatBytes(detailedData.system.memoryUsage.rss)}</p>
            <p>Heap Total: {formatBytes(detailedData.system.memoryUsage.heapTotal)}</p>
            <p>Heap Used: {formatBytes(detailedData.system.memoryUsage.heapUsed)}</p>
            <p>External: {formatBytes(detailedData.system.memoryUsage.external)}</p>
          </div>
        )}
      </div>

      <div className="card">
        <h2>Dependencies</h2>
        {detailedData && detailedData.dependencies && detailedData.dependencies.checks && (
          <div className="dependencies">
            {Object.entries(detailedData.dependencies.checks).map(([name, info]) => (
              <div key={name} className={`dependency ${info.status === 'connected' || info.status === 'reachable' ? 'connected' : 'disconnected'}`}>
                <strong>{name}:</strong> {info.status}
                {info.latency && <span> (Latency: {info.latency}ms)</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h2>Service Status</h2>
        <div className="service-status">
          <div className={`service ${readinessData && readinessData.status === 'ready' ? 'ready' : 'not-ready'}`}>
            Readiness: {readinessData?.status || 'Unknown'}
          </div>
          <div className={`service ${livenessData && livenessData.status === 'alive' ? 'alive' : 'dead'}`}>
            Liveness: {livenessData?.status || 'Unknown'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthStatus;