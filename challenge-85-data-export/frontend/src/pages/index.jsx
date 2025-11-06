import React, { useState } from 'react';
import ExportForm from '../components/ExportForm';
import ExportProgress from '../components/ExportProgress';

const HomePage = () => {
  const [currentJobId, setCurrentJobId] = useState(null);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Export</h1>
        <p className="text-gray-600">
          Export your data in multiple formats for reporting and analysis
        </p>
      </div>

      <div className="space-y-6">
        <ExportForm />
        
        <ExportProgress jobId={currentJobId} />
      </div>
    </div>
  );
};

export default HomePage;