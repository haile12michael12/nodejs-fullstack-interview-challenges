import React, { useState } from 'react';
import { encryptData, decryptData, listKeys, rotateKey } from '../services/encryptionService';

const EncryptionDashboard = () => {
  const [inputText, setInputText] = useState('');
  const [encryptedData, setEncryptedData] = useState(null);
  const [decryptedText, setDecryptedText] = useState('');
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEncrypt = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await encryptData(inputText);
      setEncryptedData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrypt = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await decryptData(encryptedData.encryptedData, encryptedData.iv);
      setDecryptedText(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleListKeys = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await listKeys();
      setKeys(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRotateKey = async () => {
    try {
      setLoading(true);
      setError(null);
      await rotateKey();
      handleListKeys(); // Refresh keys list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="card">
        <h2>Encrypt Data</h2>
        <div className="form-group">
          <label htmlFor="inputText">Text to Encrypt:</label>
          <textarea
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={4}
            placeholder="Enter text to encrypt..."
          />
        </div>
        <button onClick={handleEncrypt} disabled={loading || !inputText}>
          {loading ? 'Encrypting...' : 'Encrypt'}
        </button>
        
        {encryptedData && (
          <div className="result">
            <h3>Encrypted Result:</h3>
            <p><strong>Encrypted Data:</strong> {encryptedData.encryptedData}</p>
            <p><strong>IV:</strong> {encryptedData.iv}</p>
            <p><strong>Algorithm:</strong> {encryptedData.algorithm}</p>
          </div>
        )}
      </div>

      <div className="card">
        <h2>Decrypt Data</h2>
        <button onClick={handleDecrypt} disabled={loading || !encryptedData}>
          {loading ? 'Decrypting...' : 'Decrypt'}
        </button>
        
        {decryptedText && (
          <div className="result">
            <h3>Decrypted Result:</h3>
            <p>{decryptedText}</p>
          </div>
        )}
      </div>

      <div className="card">
        <h2>Key Management</h2>
        <div className="button-group">
          <button onClick={handleListKeys} disabled={loading}>
            List Keys
          </button>
          <button onClick={handleRotateKey} disabled={loading}>
            Rotate Key
          </button>
        </div>
        
        {keys.length > 0 && (
          <div className="keys-list">
            <h3>Encryption Keys:</h3>
            {keys.map((key) => (
              <div key={key.id} className="key-item">
                <p><strong>ID:</strong> {key.id}</p>
                <p><strong>Created:</strong> {key.createdAt}</p>
                <p><strong>Active:</strong> {key.isActive ? 'Yes' : 'No'}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <div className="error">Error: {error}</div>}
    </div>
  );
};

export default EncryptionDashboard;