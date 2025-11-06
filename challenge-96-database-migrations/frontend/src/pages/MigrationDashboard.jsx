import React, { useState, useEffect } from 'react';
import MigrationStatusTable from '../components/MigrationStatusTable';
import { getMigrationStatus, runMigrations, rollbackMigration } from '../api/migrationApi';

const MigrationDashboard = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const data = await getMigrationStatus();
      setStatus(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRunMigrations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await runMigrations();
      setResult(data);
      fetchStatus(); // Refresh status
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRollbackMigration = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await rollbackMigration();
      setResult(data);
      fetchStatus(); // Refresh status
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h2>Migration Dashboard</h2>
      
      {loading && <div className="loading">Processing...</div>}
      {error && <div className="error">Error: {error}</div>}
      {result && (
        <div className="result">
          <h3>Operation Result</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      
      <div className="actions">
        <button onClick={handleRunMigrations} disabled={loading}>
          Run Pending Migrations
        </button>
        <button onClick={handleRollbackMigration} disabled={loading}>
          Rollback Last Migration
        </button>
        <button onClick={fetchStatus} disabled={loading}>
          Refresh Status
        </button>
      </div>
      
      {status && <MigrationStatusTable status={status} />}
    </div>
  );
};

export default MigrationDashboard;