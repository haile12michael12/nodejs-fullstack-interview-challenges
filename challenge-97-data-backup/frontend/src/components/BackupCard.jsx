import React from 'react';

const BackupCard = ({ backup, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="backup-card">
      <h3>{backup.filename}</h3>
      <div className="backup-info">
        <p><strong>Size:</strong> {formatSize(backup.size)}</p>
        <p><strong>Created:</strong> {formatDate(backup.createdAt)}</p>
      </div>
      <div className="backup-actions">
        <button 
          onClick={() => onDelete(backup.filename)}
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BackupCard;