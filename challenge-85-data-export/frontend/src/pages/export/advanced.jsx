import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExportForm from '../../components/ExportForm';
import ExportProgress from '../../components/ExportProgress';

const AdvancedExportPage = () => {
  const navigate = useNavigate();
  const [currentJobId, setCurrentJobId] = useState(null);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">Advanced Export</h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Export Configuration</h2>
        <p className="text-gray-600 mb-6">
          Configure advanced export options including custom filters, data transformations, and scheduling.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Export Options</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="include-headers"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="include-headers" className="ml-2 block text-sm text-gray-700">
                  Include headers
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="pretty-format"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="pretty-format" className="ml-2 block text-sm text-gray-700">
                  Pretty format (JSON)
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Schedule Export</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="schedule-export"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="schedule-export" className="ml-2 block text-sm text-gray-700">
                  Schedule regular exports
                </label>
              </div>
              <div className="ml-6">
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <ExportForm />
        
        <ExportProgress jobId={currentJobId} />
      </div>
    </div>
  );
};

export default AdvancedExportPage;