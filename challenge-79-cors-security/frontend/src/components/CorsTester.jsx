import React, { useState, useEffect } from 'react';
import { corsAPI } from '../api/corsAPI';

const CorsTester = () => {
  const [config, setConfig] = useState(null);
  const [origins, setOrigins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newOrigin, setNewOrigin] = useState('');
  const [testUrl, setTestUrl] = useState('');
  const [testResult, setTestResult] = useState(null);

  // Fetch CORS configuration and origins on component mount
  useEffect(() => {
    fetchConfig();
    fetchOrigins();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await corsAPI.getConfig();
      setConfig(response.data);
    } catch (err) {
      setError('Failed to fetch CORS configuration');
      console.error('Error fetching config:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrigins = async () => {
    try {
      const response = await corsAPI.getOrigins();
      setOrigins(response.data);
    } catch (err) {
      setError('Failed to fetch allowed origins');
      console.error('Error fetching origins:', err);
    }
  };

  const handleAddOrigin = async (e) => {
    e.preventDefault();
    if (!newOrigin) return;
    
    setLoading(true);
    try {
      await corsAPI.addOrigin(newOrigin);
      setNewOrigin('');
      await fetchOrigins();
    } catch (err) {
      setError('Failed to add origin');
      console.error('Error adding origin:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveOrigin = async (origin) => {
    setLoading(true);
    try {
      await corsAPI.removeOrigin(origin);
      await fetchOrigins();
    } catch (err) {
      setError('Failed to remove origin');
      console.error('Error removing origin:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTestCORS = async (e) => {
    e.preventDefault();
    if (!testUrl) return;
    
    setLoading(true);
    setTestResult(null);
    setError(null);
    
    try {
      // Create a simple fetch request to test CORS
      const response = await fetch(testUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setTestResult({
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        headers: [...response.headers.entries()]
      });
    } catch (err) {
      setTestResult({
        success: false,
        error: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  const handleHealthCheck = async () => {
    setLoading(true);
    try {
      const response = await corsAPI.healthCheck();
      setTestResult({
        success: response.success,
        message: response.message,
        timestamp: response.timestamp
      });
    } catch (err) {
      setError('Health check failed');
      console.error('Health check error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">CORS Security Tester</h2>
      
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
      
      {/* CORS Configuration */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Current CORS Configuration</h3>
          <button
            onClick={fetchConfig}
            disabled={loading}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Refresh
          </button>
        </div>
        
        {loading && !config ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : config ? (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Allowed Origins</p>
                <p className="text-sm text-gray-900 break-all">{Array.isArray(config.origin) ? config.origin.join(', ') : config.origin}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Credentials</p>
                <p className="text-sm text-gray-900">{config.credentials ? 'Enabled' : 'Disabled'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Allowed Methods</p>
                <p className="text-sm text-gray-900">{config.methods?.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Max Age</p>
                <p className="text-sm text-gray-900">{config.maxAge} seconds</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      
      {/* Allowed Origins Management */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Allowed Origins</h3>
        
        <form onSubmit={handleAddOrigin} className="flex mb-4">
          <input
            type="text"
            value={newOrigin}
            onChange={(e) => setNewOrigin(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <button
            type="submit"
            disabled={loading || !newOrigin}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            Add
          </button>
        </form>
        
        <div className="bg-gray-50 rounded-lg p-4">
          {origins.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {origins.map((origin, index) => (
                <li key={index} className="py-2 flex justify-between items-center">
                  <span className="text-sm text-gray-900 break-all">{origin}</span>
                  <button
                    onClick={() => handleRemoveOrigin(origin)}
                    disabled={loading}
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No allowed origins configured</p>
          )}
        </div>
      </div>
      
      {/* CORS Testing */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">CORS Testing</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <form onSubmit={handleTestCORS} className="mb-4">
              <label htmlFor="testUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Test URL
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="testUrl"
                  value={testUrl}
                  onChange={(e) => setTestUrl(e.target.value)}
                  placeholder="https://api.example.com/endpoint"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  type="submit"
                  disabled={loading || !testUrl}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  Test
                </button>
              </div>
            </form>
            
            <button
              onClick={handleHealthCheck}
              disabled={loading}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Health Check
            </button>
          </div>
          
          <div>
            {testResult && (
              <div className={`rounded-lg p-4 ${testResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <h4 className="text-sm font-medium mb-2">Test Result</h4>
                {testResult.success ? (
                  <div>
                    <p className="text-sm text-green-800">CORS request successful!</p>
                    {testResult.status && (
                      <p className="text-sm text-green-700">Status: {testResult.status} {testResult.statusText}</p>
                    )}
                    {testResult.message && (
                      <p className="text-sm text-green-700">Message: {testResult.message}</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-red-800">CORS request failed!</p>
                    {testResult.error && (
                      <p className="text-sm text-red-700">Error: {testResult.error}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorsTester;