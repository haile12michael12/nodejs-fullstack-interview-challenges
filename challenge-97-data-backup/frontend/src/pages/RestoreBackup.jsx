import React, { useState, useEffect } from 'react';
import { getBackups, restoreBackup } from '../api/backupApi';

const RestoreBackup = () => {
  const [backups, setBackups] = useState([]);
  const [selectedBackup, setSelectedBackup] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      const data = await getBackups();
      setBackups(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBackup) {
      setError('Please select a backup to restore');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const response = await restoreBackup(selectedBackup);
      setResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Restore Backup</h1>
      <form onSubmit={handleSubmit} className="restore-form">
        <div className="form-group">
          <label htmlFor="backup">Select Backup:</label>
          <select
            id="backup"
            value={selectedBackup}
            onChange={(e) => setSelectedBackup(e.target.value)}
            required
          >
            <option value="">-- Select a backup --</option>
            {backups.map((backup) => (
              <option key={backup.filename} value={backup.filename}>
                {backup.filename} ({new Date(backup.createdAt).toLocaleString()})
              </option>
            ))}
          </select>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Restoring...' : 'Restore Backup'}
        </button>
      </form>
      
      {error && <div className="error">Error: {error}</div>}
      
      {result && (
        <div className="success">
          <h2>Backup Restored Successfully!</h2>
          <p>{result.message}</p>
        </div>
      )}
    </div>
  );
};

export default RestoreBackup;