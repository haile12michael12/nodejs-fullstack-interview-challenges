import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import FileList from '../components/FileList';

const HomePage = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleUploadSuccess = (fileData) => {
    setUploadedFile(fileData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">File Upload Validation</h1>
          <p className="mt-2 text-gray-600">Secure file upload with validation</p>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <UploadForm onUploadSuccess={handleUploadSuccess} />
            <div className="mt-8">
              <FileList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;