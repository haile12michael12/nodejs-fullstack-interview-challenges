import React, { useState, useEffect } from 'react';
import BackupCard from '../components/BackupCard';
import { getBackups, deleteBackup } from '../api/backupApi';

const BackupList = () => {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      setLoading(true);
      const data = await getBackups();
      setBackups(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (filename) => {
    try {
      await deleteBackup(filename);
      fetchBackups(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading backups...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="page">
      <h1>Available Backups</h1>
      <div className="backup-list">
        {backups.length === 0 ? (
          <p>No backups found.</p>
        ) : (
          backups.map((backup) => (
            <BackupCard 
              key={backup.filename} 
              backup={backup} 
              onDelete={handleDelete} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BackupList;