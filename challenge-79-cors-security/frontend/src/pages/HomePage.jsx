import React from 'react';
import CorsTester from '../components/CorsTester';

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CORS Security Dashboard</h1>
          <p className="text-lg text-gray-600">
            Manage and test Cross-Origin Resource Sharing policies
          </p>
        </div>
        
        <CorsTester />
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About CORS Security</h2>
          <div className="prose max-w-none">
            <p>
              Cross-Origin Resource Sharing (CORS) is a security feature that allows or restricts 
              requested resources on a web server depending on where the HTTP request was initiated.
            </p>
            <h3 className="text-lg font-medium text-gray-900 mt-4">Key Security Considerations:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Origin Whitelisting:</strong> Only allow trusted domains to access your API
              </li>
              <li>
                <strong>Credentials Handling:</strong> Be cautious when allowing credentials with CORS
              </li>
              <li>
                <strong>Method Restrictions:</strong> Limit allowed HTTP methods to what's necessary
              </li>
              <li>
                <strong>Header Control:</strong> Carefully manage which headers can be exposed to clients
              </li>
              <li>
                <strong>Preflight Requests:</strong> Properly handle OPTIONS requests for complex CORS
              </li>
            </ul>
            <h3 className="text-lg font-medium text-gray-900 mt-4">Best Practices:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Never use wildcard (*) in production for origins that require credentials</li>
              <li>Regularly audit and update your CORS configuration</li>
              <li>Implement proper logging for CORS requests</li>
              <li>Use environment-specific CORS settings</li>
              <li>Test CORS policies thoroughly in different environments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;