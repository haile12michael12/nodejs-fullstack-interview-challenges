import React, { useState, useEffect } from 'react';
import SwaggerUIWrapper from '../components/SwaggerUIWrapper';
import { apiClient } from '../utils/api';

const DocsViewer = () => {
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
      const response = await apiClient.getHealth();
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">API Documentation</h1>
              <p className="mt-2 text-lg text-gray-600">
                Interactive documentation for our REST API
              </p>
            </div>
            <button
              onClick={fetchHealth}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Checking...
                </>
              ) : 'Refresh Health'}
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
                    API is running - {health.message} (Last checked: {new Date(health.timestamp).toLocaleString()})
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Documentation Info */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About This Documentation</h2>
          <div className="prose max-w-none">
            <p>
              This interactive documentation provides detailed information about all available API endpoints, 
              including request/response schemas, example requests, and authentication requirements.
            </p>
            <h3 className="text-lg font-medium text-gray-900 mt-4">How to Use</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Expand endpoint sections to view details</li>
              <li>Click "Try it out" to test endpoints directly</li>
              <li>Fill in required parameters and request bodies</li>
              <li>Click "Execute" to send requests and view responses</li>
            </ul>
            <h3 className="text-lg font-medium text-gray-900 mt-4">Authentication</h3>
            <p>
              Most endpoints require authentication using a Bearer token. To authenticate:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Click the "Authorize" button at the top of the documentation</li>
              <li>Enter your Bearer token in the format: <code>Bearer your-token-here</code></li>
              <li>Click "Authorize" and then "Close"</li>
            </ol>
          </div>
        </div>

        {/* Swagger UI */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">API Endpoints</h2>
          </div>
          <div className="p-4">
            <SwaggerUIWrapper />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsViewer;