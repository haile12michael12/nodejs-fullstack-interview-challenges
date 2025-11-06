import React, { useEffect } from 'react';
import { useExportStatus } from '../hooks/useExportStatus';
import { formatDate } from '../utils/formatHelper';

const ExportProgress = ({ jobId, onJobComplete }) => {
  const { status, loading, error, startPolling } = useExportStatus(jobId);

  useEffect(() => {
    if (jobId) {
      const stopPolling = startPolling(2000);
      return stopPolling;
    }
  }, [jobId]);

  if (!jobId) {
    return null;
  }

  if (loading && !status) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading export status...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="text-red-700 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">No export job found</p>
      </div>
    );
  }

  const isCompleted = status.status === 'completed';
  const isFailed = status.status === 'failed';
  const isInProgress = status.status === 'processing' || status.status === 'pending';

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Export Job Status</h3>
        <span className={`px-2 py-1 text-xs rounded-full ${
          isCompleted ? 'bg-green-100 text-green-800' :
          isFailed ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {status.status}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{status.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                isFailed ? 'bg-red-600' : 'bg-blue-600'
              }`}
              style={{ width: `${status.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Format</p>
            <p className="font-medium">{status.format}</p>
          </div>
          <div>
            <p className="text-gray-500">Created</p>
            <p className="font-medium">{formatDate(status.createdAt)}</p>
          </div>
          {status.completedAt && (
            <div>
              <p className="text-gray-500">Completed</p>
              <p className="font-medium">{formatDate(status.completedAt)}</p>
            </div>
          )}
        </div>

        {isFailed && status.error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-800 text-sm">{status.error}</p>
          </div>
        )}

        {isCompleted && status.result && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3">
            <p className="text-green-800 text-sm">
              Export completed successfully! Check your downloads folder.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportProgress;