import React from 'react';
import { formatDate, getExportFormatLabel } from '../utils/formatHelper';

const ExportResult = ({ job }) => {
  if (!job || job.status !== 'completed') {
    return null;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Export Completed</h3>
        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
          Completed
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
        <div>
          <p className="text-gray-500">Format</p>
          <p className="font-medium">{getExportFormatLabel(job.format)}</p>
        </div>
        <div>
          <p className="text-gray-500">Completed</p>
          <p className="font-medium">{formatDate(job.completedAt)}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          Download File
        </button>
        
        <button
          type="button"
          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Export Again
        </button>
      </div>
    </div>
  );
};

export default ExportResult;