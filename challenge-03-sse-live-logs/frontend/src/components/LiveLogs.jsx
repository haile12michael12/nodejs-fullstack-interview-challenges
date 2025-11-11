// Core log stream viewer
import React, { useState, useEffect, useRef } from 'react';

const LiveLogs = ({ logs, isConnected, error, onTriggerLog, onClearLogs, autoScroll, setAutoScroll, stats }) => {
  const logsEndRef = useRef(null);

  const scrollToBottom = () => {
    if (autoScroll && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs, autoScroll]);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getLogTypeColor = (type) => {
    switch (type) {
      case 'ERROR': return 'error';
      case 'WARN': return 'warn';
      case 'INFO':
      case 'DEBUG':
      default: return 'info';
    }
  };

  return (
    <div className="live-logs">
      <div className="status">
        <div className={`status-indicator ${isConnected ? 'connected' : ''}`}></div>
        <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
      </div>

      {stats && (
        <div className="stats">
          <div className="stat-card">
            <div className="stat-value">{stats.connectedClients}</div>
            <div className="stat-label">Connected Clients</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.totalLogs}</div>
            <div className="stat-label">Total Logs</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{Math.floor(stats.uptime)}s</div>
            <div className="stat-label">Uptime</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{Math.round(stats.memoryUsage.heapUsed / 1024 / 1024)}MB</div>
            <div className="stat-label">Memory Usage</div>
          </div>
        </div>
      )}

      <div className="controls">
        <button onClick={onTriggerLog}>
          Trigger Log
        </button>
        <button onClick={onClearLogs} className="danger">
          Clear Logs
        </button>
      </div>

      <div className="auto-scroll-toggle">
        <input
          type="checkbox"
          id="auto-scroll"
          checked={autoScroll}
          onChange={(e) => setAutoScroll(e.target.checked)}
        />
        <label htmlFor="auto-scroll">Auto-scroll to bottom</label>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="logs-container">
        {logs.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)' }}>
            No logs yet. Waiting for log entries...
          </div>
        ) : (
          logs.map((log, index) => (
            <div key={`${log.id}-${index}`} className={`log-entry ${getLogTypeColor(log.type)}`}>
              <span className="log-timestamp">{formatTimestamp(log.timestamp)}</span>
              <span className="log-type">[{log.type}]</span>
              <span className="log-message">{log.message}</span>
            </div>
          ))
        )}
        <div ref={logsEndRef} />
      </div>

      <div style={{ marginTop: '1rem', fontSize: '0.875rem', opacity: 0.7 }}>
        <p>Logs are automatically generated every 2-5 seconds.</p>
        <p>Click "Trigger Log" to manually generate a log entry.</p>
        <p>Showing {logs.length} log entries</p>
      </div>
    </div>
  );
};

export default LiveLogs;