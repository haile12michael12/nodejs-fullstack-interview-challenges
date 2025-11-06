import React, { useState } from 'react';

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      await onUpload(file);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownloadTemplate = async (type) => {
    // In a real implementation, you would download the template
    alert(`Downloading ${type} template...`);
  };

  return (
    <div className="card">
      <h2>Upload Data File</h2>
      <div className="upload-section">
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept=".csv,.json,.xlsx,.xls"
        />
        <div className="button-group">
          <button onClick={handleUpload} disabled={isUploading || !file}>
            {isUploading ? 'Uploading...' : 'Upload File'}
          </button>
        </div>
        <div className="template-links">
          <p>Download templates:</p>
          <button onClick={() => handleDownloadTemplate('csv')}>CSV Template</button>
          <button onClick={() => handleDownloadTemplate('json')}>JSON Template</button>
          <button onClick={() => handleDownloadTemplate('xlsx')}>Excel Template</button>
        </div>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default FileUpload;