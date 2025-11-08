import React, { useState, useEffect } from 'react';
import LogTable from '../components/LogTable';
import LogSearchForm from '../components/LogSearchForm';
import PerformanceChart from '../components/PerformanceChart';
import { logApi } from '../services/logApi';

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch logs on component mount
  useEffect(() => {
    fetchLogs();
    fetchStats();
    fetchPerformance();
  }, []);

  const fetchLogs = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await logApi.getLogs(filters);
      setLogs(response.data || []);
    } catch (err) {
      setError('Failed to fetch logs');
      console.error('Error fetching logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await logApi.getStats();
      setStats(response.data);
    } catch (err) {
      setError('Failed to fetch statistics');
      console.error('Error fetching stats:', err);
    }
  };

  const fetchPerformance = async () => {
    try {
      const response = await logApi.getPerformance();
      setPerformance(response.data);
    } catch (err) {
      setError('Failed to fetch performance data');
      console.error('Error fetching performance:', err);
    }
  };

  const handleSearch = async (criteria) => {
    await fetchLogs(criteria);
  };

  const refreshData = async () => {
    await fetchLogs();
    await fetchStats();
    await fetchPerformance();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Request Logs</h2>
        <button
          onClick={refreshData}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <LogSearchForm onSearch={handleSearch} loading={loading} />

      {stats && performance && (
        <PerformanceChart stats={stats} performance={performance} />
      )}

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Requests</h3>
          <span className="text-sm text-gray-500">
            Showing {logs.length} requests
          </span>
        </div>
        <LogTable logs={logs} loading={loading} />
      </div>
    </div>
  );
};

export default LogsPage;