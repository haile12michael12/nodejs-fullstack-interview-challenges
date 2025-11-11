import React, { useState, useEffect, useRef } from 'react'
import LiveLogs from './components/LiveLogs';
import { useSSE } from './hooks/useSSE';
import './styles/globals.css';

const API_BASE = '/api';

function App() {
  const { logs, isConnected, error, clearLogs } = useSSE(100);
  const [stats, setStats] = useState(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    // Fetch stats periodically
    const statsInterval = setInterval(fetchStats, 5000);
    
    return () => {
      clearInterval(statsInterval);
    };
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const triggerLog = async () => {
    try {
      const response = await fetch(`${API_BASE}/trigger`, {
        method: 'POST'
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Manual log triggered:', data);
      }
    } catch (error) {
      console.error('Error triggering log:', error);
    }
  };

  return (
    <div className="container">
      <h1>SSE Live Logs Viewer</h1>
      
      <LiveLogs
        logs={logs}
        isConnected={isConnected}
        error={error}
        onTriggerLog={triggerLog}
        onClearLogs={clearLogs}
        autoScroll={autoScroll}
        setAutoScroll={setAutoScroll}
        stats={stats}
      />
    </div>
  );
}

export default App
