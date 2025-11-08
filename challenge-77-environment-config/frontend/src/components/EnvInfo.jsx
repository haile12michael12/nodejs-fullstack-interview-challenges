import React, { useState, useEffect } from 'react';
import { api } from '../core/apiClient';

const EnvInfo = () => {
  const [envData, setEnvData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEnvInfo();
  }, []);

  const fetchEnvInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getEnvironment();
      setEnvData(response.data);
    } catch (err) {
      setError('Failed to fetch environment information');
      console.error('Error fetching environment info:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
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
    );
  }

  if (!envData) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No environment data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Environment Information</h3>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Environment */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-2">Environment</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Name</p>
              <p className="text-lg font-medium text-gray-900">{envData.environment.name}</p>
              <div className="mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  envData.environment.isDevelopment 
                    ? 'bg-green-100 text-green-800' 
                    : envData.environment.isProduction 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {envData.environment.isDevelopment ? 'Development' : 
                   envData.environment.isProduction ? 'Production' : 'Test'}
                </span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-2">Features</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Feature Flag:</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  envData.features.enabled 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {envData.features.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>

          {/* API Configuration */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-2">API Configuration</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Base URL</p>
              <p className="text-sm font-medium text-gray-900 break-all">{envData.api.baseUrl}</p>
              <p className="text-sm text-gray-600 mt-2">API Key</p>
              <p className="text-sm font-medium text-gray-900">{envData.api.apiKey || 'Not set'}</p>
            </div>
          </div>

          {/* Security */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-2">Security</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">JWT Secret</p>
              <p className="text-sm font-medium text-gray-900">{envData.security.jwtSecret || 'Not set'}</p>
              <p className="text-sm text-gray-600 mt-2">Salt Rounds</p>
              <p className="text-sm font-medium text-gray-900">{envData.security.saltRounds}</p>
            </div>
          </div>
        </div>

        {/* Validation */}
        <div className="mt-6">
          <h4 className="text-md font-medium text-gray-900 mb-2">Configuration Validation</h4>
          <div className={`rounded-lg p-4 ${
            envData.validation.isValid 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center">
              <svg className={`h-5 w-5 ${
                envData.validation.isValid ? 'text-green-400' : 'text-red-400'
              }`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                {envData.validation.isValid ? (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                )}
              </svg>
              <span className={`ml-2 text-sm font-medium ${
                envData.validation.isValid ? 'text-green-800' : 'text-red-800'
              }`}>
                Configuration is {envData.validation.isValid ? 'valid' : 'invalid'}
              </span>
            </div>
            {!envData.validation.isValid && envData.validation.missingKeys && (
              <div className="mt-2">
                <p className="text-sm text-red-700">Missing keys:</p>
                <ul className="list-disc list-inside text-sm text-red-700">
                  {envData.validation.missingKeys.map((key, index) => (
                    <li key={index}>{key}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvInfo;