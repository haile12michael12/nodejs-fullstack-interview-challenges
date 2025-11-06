import React, { useState, useEffect } from 'react';
import { getSecurityConfig, getSecurityStatus } from '../api/security';

const CSPTester = () => {
  const [config, setConfig] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [configData, statusData] = await Promise.all([
        getSecurityConfig(),
        getSecurityStatus()
      ]);
      setConfig(configData);
      setStatus(statusData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testInlineScript = () => {
    try {
      // This should be blocked by CSP if properly configured
      eval('console.log("Inline script executed")');
      alert('Inline script executed - CSP may not be properly configured');
    } catch (err) {
      alert('Inline script blocked - CSP is working');
    }
  };

  const testExternalScript = () => {
    const script = document.createElement('script');
    script.src = 'https://example.com/test.js';
    script.onload = () => alert('External script loaded');
    script.onerror = () => alert('External script blocked');
    document.head.appendChild(script);
  };

  if (loading) return <div className="card">Loading security data...</div>;
  if (error) return <div className="card error">Error: {error}</div>;

  return (
    <div className="card">
      <h2>Security Headers Test</h2>
      
      <div className="section">
        <h3>Security Status</h3>
        {status && (
          <div className="status-grid">
            <div className="status-item">
              <strong>Status:</strong> {status.status}
            </div>
            {Object.entries(status.headers).map(([header, value]) => (
              <div key={header} className="status-item">
                <strong>{header}:</strong> {value}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="section">
        <h3>CSP Tests</h3>
        <div className="button-group">
          <button onClick={testInlineScript}>
            Test Inline Script
          </button>
          <button onClick={testExternalScript}>
            Test External Script
          </button>
        </div>
        <p className="info">
          These tests will show alerts indicating whether CSP is properly blocking 
          inline and external scripts.
        </p>
      </div>

      <div className="section">
        <h3>Configuration</h3>
        {config && (
          <pre className="config-display">
            {JSON.stringify(config, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default CSPTester;