import React, { useState, useEffect } from 'react'

const API_BASE = '/api'

function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [autoTestEnabled, setAutoTestEnabled] = useState(false)
  const [autoTestInterval, setAutoTestInterval] = useState(1000)
  const [autoTestEndpoint, setAutoTestEndpoint] = useState('/api/test')
  const [stats, setStats] = useState({
    totalRequests: 0,
    successfulRequests: 0,
    rateLimitedRequests: 0,
    failedRequests: 0
  })

  useEffect(() => {
    let intervalId
    if (autoTestEnabled) {
      intervalId = setInterval(() => {
        testEndpoint(autoTestEndpoint, false)
      }, autoTestInterval)
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [autoTestEnabled, autoTestInterval, autoTestEndpoint])

  const testEndpoint = async (endpoint, addToResults = true) => {
    const startTime = Date.now()
    const timestamp = new Date().toISOString()
    
    if (addToResults) {
      setLoading(true)
    }

    try {
      const response = await fetch(`${API_BASE}${endpoint}`)
      const data = await response.json()
      const duration = Date.now() - startTime

      const result = {
        id: Date.now() + Math.random(),
        endpoint,
        status: response.status,
        success: response.ok,
        duration,
        timestamp,
        data,
        headers: {
          'X-RateLimit-Limit': response.headers.get('X-RateLimit-Limit'),
          'X-RateLimit-Remaining': response.headers.get('X-RateLimit-Remaining'),
          'X-RateLimit-Reset': response.headers.get('X-RateLimit-Reset'),
          'Retry-After': response.headers.get('Retry-After')
        }
      }

      if (addToResults) {
        setResults(prev => [result, ...prev.slice(0, 49)]) // Keep last 50 results
        updateStats(result)
      }

      return result
    } catch (error) {
      const result = {
        id: Date.now() + Math.random(),
        endpoint,
        status: 0,
        success: false,
        duration: Date.now() - startTime,
        timestamp,
        error: error.message
      }

      if (addToResults) {
        setResults(prev => [result, ...prev.slice(0, 49)])
        updateStats(result)
      }

      return result
    } finally {
      if (addToResults) {
        setLoading(false)
      }
    }
  }

  const updateStats = (result) => {
    setStats(prev => {
      const newStats = {
        totalRequests: prev.totalRequests + 1,
        successfulRequests: prev.successfulRequests + (result.success ? 1 : 0),
        rateLimitedRequests: prev.rateLimitedRequests + (result.status === 429 ? 1 : 0),
        failedRequests: prev.failedRequests + (!result.success && result.status !== 429 ? 1 : 0)
      }
      return newStats
    })
  }

  const clearResults = () => {
    setResults([])
    setStats({
      totalRequests: 0,
      successfulRequests: 0,
      rateLimitedRequests: 0,
      failedRequests: 0
    })
  }

  const getResultStatus = (result) => {
    if (result.status === 429) return 'rate-limited'
    if (result.success) return 'success'
    return 'error'
  }

  const getResultStatusText = (result) => {
    if (result.status === 429) return 'Rate Limited'
    if (result.success) return 'Success'
    return 'Error'
  }

  const formatDuration = (ms) => {
    return `${ms}ms`
  }

  const endpoints = [
    {
      path: '/api/data',
      method: 'GET',
      description: 'Returns sample API data with user information and statistics'
    },
    {
      path: '/api/status',
      method: 'GET',
      description: 'Returns API status, uptime, and rate limit configuration'
    },
    {
      path: '/api/test',
      method: 'GET',
      description: 'Test endpoint with random delay (0-1000ms)'
    }
  ]

  return (
    <div className="container">
      <h1>Rate Limit API Tester</h1>
      <p>Test the Redis-backed rate limiting implementation</p>
      
      <div className="rate-limit-info">
        <h3>Rate Limit Configuration</h3>
        <div className="info-grid">
          <div className="info-item">
            <strong>Token Bucket Capacity:</strong> 10 tokens
          </div>
          <div className="info-item">
            <strong>Refill Rate:</strong> 1 token per second
          </div>
          <div className="info-item">
            <strong>Window:</strong> 60 seconds
          </div>
          <div className="info-item">
            <strong>Max Requests:</strong> 10 per window
          </div>
        </div>
      </div>

      <div className="stats">
        <div className="stat-card">
          <div className="stat-value">{stats.totalRequests}</div>
          <div className="stat-label">Total Requests</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.successfulRequests}</div>
          <div className="stat-label">Successful</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.rateLimitedRequests}</div>
          <div className="stat-label">Rate Limited</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.failedRequests}</div>
          <div className="stat-label">Failed</div>
        </div>
      </div>

      <div className="endpoints-grid">
        {endpoints.map((endpoint, index) => (
          <div key={index} className="endpoint-card">
            <h3>
              <span className="method-badge">{endpoint.method}</span>
              {endpoint.path}
            </h3>
            <p>{endpoint.description}</p>
            <div className="endpoint-actions">
              <button 
                className="primary"
                onClick={() => testEndpoint(endpoint.path)}
                disabled={loading}
              >
                Test Once
              </button>
              <button 
                className="secondary"
                onClick={() => {
                  for (let i = 0; i < 5; i++) {
                    setTimeout(() => testEndpoint(endpoint.path), i * 100)
                  }
                }}
                disabled={loading}
              >
                Test 5x
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="test-controls">
        <h3>Automated Testing</h3>
        <div className="control-group">
          <label htmlFor="auto-test-enabled">
            <input
              type="checkbox"
              id="auto-test-enabled"
              checked={autoTestEnabled}
              onChange={(e) => setAutoTestEnabled(e.target.checked)}
            />
            Enable automated testing
          </label>
        </div>
        
        {autoTestEnabled && (
          <>
            <div className="control-group">
              <label htmlFor="auto-test-endpoint">Endpoint:</label>
              <select
                id="auto-test-endpoint"
                value={autoTestEndpoint}
                onChange={(e) => setAutoTestEndpoint(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '4px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white'
                }}
              >
                {endpoints.map((endpoint, index) => (
                  <option key={index} value={endpoint.path}>
                    {endpoint.method} {endpoint.path}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="control-group">
              <label htmlFor="auto-test-interval">Interval (ms):</label>
              <input
                type="number"
                id="auto-test-interval"
                value={autoTestInterval}
                onChange={(e) => setAutoTestInterval(parseInt(e.target.value))}
                min="100"
                max="10000"
                step="100"
              />
            </div>
          </>
        )}
      </div>

      <div className="results-section">
        <h3>Test Results</h3>
        
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            Testing endpoint...
          </div>
        )}

        {results.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)' }}>
            No test results yet. Click "Test Once" on any endpoint to get started.
          </p>
        ) : (
          <>
            <div className="clear-results">
              <button className="secondary" onClick={clearResults}>
                Clear Results
              </button>
            </div>
            
            {results.map((result) => (
              <div key={result.id} className={`result-item ${getResultStatus(result)}`}>
                <div className="result-header">
                  <div>
                    <span className={`result-status ${getResultStatus(result)}`}>
                      {getResultStatusText(result)}
                    </span>
                    <span style={{ marginLeft: '10px', color: 'rgba(255, 255, 255, 0.6)' }}>
                      {result.endpoint}
                    </span>
                  </div>
                  <div className="result-timestamp">
                    {new Date(result.timestamp).toLocaleTimeString()} ({formatDuration(result.duration)})
                  </div>
                </div>

                {result.headers && (result.headers['X-RateLimit-Limit'] || result.headers['Retry-After']) && (
                  <div className="rate-limit-headers">
                    <h4>Rate Limit Headers:</h4>
                    {result.headers['X-RateLimit-Limit'] && (
                      <div>Limit: {result.headers['X-RateLimit-Limit']}</div>
                    )}
                    {result.headers['X-RateLimit-Remaining'] && (
                      <div>Remaining: {result.headers['X-RateLimit-Remaining']}</div>
                    )}
                    {result.headers['X-RateLimit-Reset'] && (
                      <div>Reset: {new Date(result.headers['X-RateLimit-Reset']).toLocaleTimeString()}</div>
                    )}
                    {result.headers['Retry-After'] && (
                      <div>Retry After: {result.headers['Retry-After']} seconds</div>
                    )}
                  </div>
                )}

                <div className="result-content">
                  {result.error ? (
                    `Error: ${result.error}`
                  ) : (
                    `Status: ${result.status}\n\nResponse:\n${JSON.stringify(result.data, null, 2)}`
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default App

