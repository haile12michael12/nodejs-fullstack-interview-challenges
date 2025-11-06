import React from 'react';

const JobStatusCard = ({ job }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg truncate">{job.type}</h3>
          <p className="text-gray-600 text-sm mt-1">ID: {job.id}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
          {job.status}
        </span>
      </div>
      
      <div className="mt-3">
        <p className="text-gray-700 text-sm line-clamp-2">
          {JSON.stringify(job.payload)}
        </p>
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        <div>Created: {formatTimestamp(job.createdAt)}</div>
        {job.updatedAt && <div>Updated: {formatTimestamp(job.updatedAt)}</div>}
      </div>
    </div>
  );
};

export default JobStatusCard;