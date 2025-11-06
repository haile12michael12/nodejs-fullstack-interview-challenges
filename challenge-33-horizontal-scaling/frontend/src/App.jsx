import React, { useState, useEffect } from 'react';
import { getHealth, getStats, getSession, createSession } from './api';

function App() {
  const [healthData, setHealthData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [health, stats, session] = await Promise.all([
        getHealth(),
        getStats(),
        getSession()
      ]);
      setHealthData(health);
      setStatsData(stats);
      setSessionData(session);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSession = async () => {
    try {
      const session = await createSession({ test: 'data' });
      setSessionData(session);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Horizontal Scaling Dashboard</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Health Status</h2>
        <pre>{JSON.stringify(healthData, null, 2)}</pre>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Statistics</h2>
        <pre>{JSON.stringify(statsData, null, 2)}</pre>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Session</h2>
        <pre>{JSON.stringify(sessionData, null, 2)}</pre>
        <button onClick={handleCreateSession}>Create Session</button>
      </div>
    </div>
  );
}

export default App;