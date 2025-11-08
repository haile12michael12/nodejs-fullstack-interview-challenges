import React, { useState, useEffect } from 'react';
import EnvInfo from '../components/EnvInfo';
import { api } from '../core/apiClient';
import config from '../config';

const Home = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHealth();
  }, []);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getHealth();
      setHealth(response);
    } catch (err) {
      setError('Failed to fetch health status');
      console.error('Health check error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Environment Configuration</h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage and monitor your application's environment configuration
          </p>
        </div>

        {/* Health Status */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">System Health</h2>
            <button
              onClick={fetchHealth}
              disabled={loading}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Checking...
                </>
              ) : 'Refresh'}
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

          {health && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    System is healthy - {health.status} (Last checked: {new Date(health.timestamp).toLocaleString()})
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Environment Info */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Environment Configuration</h2>
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Current Environment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Environment</p>
                <p className="text-lg font-medium text-gray-900">{config.env}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">API Base URL</p>
                <p className="text-lg font-medium text-gray-900 break-all">{config.api.baseUrl}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Feature Flag</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  config.features.flagEnabled 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {config.features.flagEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Environment Information */}
        <EnvInfo />

        {/* Documentation */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About Environment Configuration</h2>
          <div className="prose max-w-none">
            <p>
              This application demonstrates proper environment configuration management with:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Environment variable validation</li>
              <li>Multiple environment support (development, test, production)</li>
              <li>Secure secret handling</li>
              <li>Configuration separation of concerns</li>
              <li>Runtime configuration monitoring</li>
            </ul>
            <h3 className="text-lg font-medium text-gray-900 mt-4">Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Never commit sensitive configuration to version control</li>
              <li>Use different configuration files for each environment</li>
              <li>Validate environment variables at startup</li>
              <li>Mask sensitive values in logs</li>
              <li>Use feature flags for controlled rollouts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;