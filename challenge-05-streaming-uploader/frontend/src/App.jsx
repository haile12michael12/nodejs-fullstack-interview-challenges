import React, { useState, useEffect } from 'react';
import FileUploader from './components/FileUploader';
import { uploadFile, listFiles, deleteFile } from './utils/api';

function App() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const fileList = await listFiles();
      setFiles(fileList);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file, onProgress) => {
    try {
      const result = await uploadFile(file, onProgress);
      // Refresh file list after upload
      fetchFiles();
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const handleFileDelete = async (filename) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      await deleteFile(filename);
      // Refresh file list after deletion
      fetchFiles();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Streaming File Uploader with Security Scan</h1>
      
      <FileUploader 
        onFileUpload={handleFileUpload}
        onFileDelete={handleFileDelete}
        files={files}
        loading={loading}
        error={error}
      />
      
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;