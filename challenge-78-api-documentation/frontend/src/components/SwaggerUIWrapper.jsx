import React, { useState, useEffect } from 'react';
import SwaggerUI from 'swagger-ui-dist';
import 'swagger-ui-dist/swagger-ui.css';
import { apiClient } from '../utils/api';

const SwaggerUIWrapper = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initSwagger = async () => {
      try {
        setLoading(true);
        // Fetch the Swagger specification
        const spec = await apiClient.getDocumentation();
        
        // Render Swagger UI
        SwaggerUI({
          dom_id: '#swagger-ui',
          spec: spec,
          presets: [
            SwaggerUI.presets.apis,
            SwaggerUI.presets.core
          ],
          plugins: [
            SwaggerUI.plugins.DownloadUrl
          ],
          deepLinking: false,
          docExpansion: 'list',
          defaultModelExpandDepth: 2,
          defaultModelsExpandDepth: 2,
          supportedSubmitMethods: ['get', 'post', 'put', 'delete'],
          validatorUrl: null
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Failed to load Swagger UI:', err);
        setError('Failed to load API documentation');
        setLoading(false);
      }
    };

    initSwagger();
  }, []);

  return (
    <div className="swagger-ui-wrapper">
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
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
      )}
      
      <div id="swagger-ui"></div>
    </div>
  );
};

export default SwaggerUIWrapper;