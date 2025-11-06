import React, { useEffect, useState } from 'react';

const ImportProgress = ({ importId }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!importId) return;

    const fetchStatus = async () => {
      try {
        setLoading(true);
        // In a real implementation, you would call the API to get the status
        // const data = await getImportStatus(importId);
        // setStatus(data);
        
        // Mock data for demonstration
        setStatus({
          importId,
          fileName: 'sample.csv',
          status: 'completed',
          totalRows: 1000,
          processedRows: 950,
          errorRows: 50,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [importId]);

  if (!importId) return null;
  if (loading) return <div className="card">Loading import status...</div>;
  if (error) return <div className="card error">Error: {error}</div>;

  const progress = status.totalRows > 0 
    ? Math.round((status.processedRows / status.totalRows) * 100) 
    : 0;

  return (
    <div className="card">
      <h2>Import Progress</h2>
      <div className="progress-info">
        <div className="progress-item">
          <strong>File:</strong> {status.fileName}
        </div>
        <div className="progress-item">
          <strong>Status:</strong> {status.status}
        </div>
        <div className="progress-item">
          <strong>Progress:</strong> {progress}%
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-stats">
          <div className="stat">
            <strong>Total Rows:</strong> {status.totalRows}
          </div>
          <div className="stat">
            <strong>Processed:</strong> {status.processedRows}
          </div>
          <div className="stat">
            <strong>Errors:</strong> {status.errorRows}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportProgress;