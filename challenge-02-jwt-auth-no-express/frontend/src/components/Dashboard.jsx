// Dashboard component
import React, { useState, useEffect } from 'react';

const Dashboard = ({ user, onFetchProtectedData, onLogout }) => {
  const [protectedData, setProtectedData] = useState(null);
  const [error, setError] = useState('');

  const handleFetchData = async () => {
    try {
      const data = await onFetchProtectedData();
      setProtectedData(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch protected data');
    }
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.username}!</h1>
      
      <div className="user-info">
        <h3>User Information</h3>
        <p><strong>ID:</strong> {user?.id}</p>
        <p><strong>Username:</strong> {user?.username}</p>
      </div>

      <button onClick={handleFetchData}>
        Fetch Protected Data
      </button>

      {protectedData && (
        <div className="protected-content">
          <h3>Protected Data</h3>
          <p><strong>Message:</strong> {protectedData.message}</p>
          <p><strong>Timestamp:</strong> {new Date(protectedData.timestamp).toLocaleString()}</p>
          <p><strong>User ID:</strong> {protectedData.userId}</p>
        </div>
      )}

      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Dashboard;