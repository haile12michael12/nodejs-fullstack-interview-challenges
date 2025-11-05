import React, { useState } from 'react';
import { createBackup } from '../api/backupApi';

const CreateBackup = () => {
  const [name, setName] = useState('');
  const [encrypt, setEncrypt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const backup = await createBackup({ name, encrypt });
      setResult(backup);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Create Backup</h1>
      <form onSubmit={handleSubmit} className="backup-form">
        <div className="form-group">
          <label htmlFor="name">Backup Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter backup name"
            required
          />
        </div>
        
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={encrypt}
              onChange={(e) => setEncrypt(e.target.checked)}
            />
            Encrypt Backup
          </label>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Backup'}
        </button>
      </form>
      
      {error && <div className="error">Error: {error}</div>}
      
      {result && (
        <div className="success">
          <h2>Backup Created Successfully!</h2>
          <p>Filename: {result.filename}</p>
          <p>Size: {result.size} bytes</p>
          <p>Created At: {new Date(result.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default CreateBackup;