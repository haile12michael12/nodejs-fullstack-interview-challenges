import React, { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import ImportProgress from '../components/ImportProgress';
import ErrorTable from '../components/ErrorTable';
import { uploadFile, listImports } from '../api/importApi';

const ImportDashboard = () => {
  const [importId, setImportId] = useState(null);
  const [imports, setImports] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImports();
  }, []);

  const fetchImports = async () => {
    try {
      setLoading(true);
      const data = await listImports();
      setImports(data);
    } catch (error) {
      console.error('Failed to fetch imports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file) => {
    try {
      const result = await uploadFile(file);
      setImportId(result.importId);
      
      // In a real implementation, you would fetch errors for the import
      // const errorData = await getImportErrors(result.importId);
      // setErrors(errorData);
      
      // Mock errors for demonstration
      setErrors([
        {
          rowNumber: 15,
          errorMessage: 'Invalid email format',
          rowData: { name: 'John Doe', email: 'invalid-email', age: 30 }
        },
        {
          rowNumber: 42,
          errorMessage: 'Name is required',
          rowData: { name: '', email: 'jane@example.com', age: 25 }
        }
      ]);
      
      // Refresh imports list
      fetchImports();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="dashboard">
      <FileUpload onUpload={handleUpload} />
      
      <ImportProgress importId={importId} />
      
      <ErrorTable errors={errors} />
      
      <div className="card">
        <h2>Recent Imports</h2>
        {loading ? (
          <p>Loading imports...</p>
        ) : (
          <div className="imports-list">
            {imports.map((imp) => (
              <div key={imp.importId} className="import-item">
                <div className="import-info">
                  <strong>{imp.fileName}</strong>
                  <span className={`status ${imp.status}`}>{imp.status}</span>
                </div>
                <div className="import-stats">
                  <span>Total: {imp.totalRows}</span>
                  <span>Processed: {imp.processedRows}</span>
                  <span>Errors: {imp.errorRows}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportDashboard;