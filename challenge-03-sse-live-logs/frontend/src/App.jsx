import React, { useState, useEffect, useRef } from 'react'

const API_BASE = '/api'

function App() {
  const [logs, setLogs] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState('')
  const [stats, setStats] = useState(null)
  const [autoScroll, setAutoScroll] = useState(true)
  const [maxLogs, setMaxLogs] = useState(100)
  const logsEndRef = useRef(null)
  const eventSourceRef = useRef(null)

  const scrollToBottom = () => {
    if (autoScroll && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [logs, autoScroll])

  useEffect(() => {
    // Fetch initial logs
    fetchInitialLogs()
    
    // Connect to SSE stream
    connectToSSE()
    
    // Fetch stats periodically
    const statsInterval = setInterval(fetchStats, 5000)
    
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
      }
      clearInterval(statsInterval)
    }
  }, [])

  const fetchInitialLogs = async () => {
    try {
      const response = await fetch(`${API_BASE}/logs`)
      if (response.ok) {
        const data = await response.json()
        setLogs(data.logs || [])
      }
    } catch (error) {
      console.error('Error fetching initial logs:', error)
    }
  }

  const connectToSSE = () => {
    try {
      const eventSource = new EventSource(`${API_BASE}/events`)
      eventSourceRef.current = eventSource

      eventSource.onopen = () => {
        setIsConnected(true)
        setError('')
      }

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          
          if (data.type === 'heartbeat') {
            // Handle heartbeat - just update connection status
            return
          }

          // Add new log entry
          setLogs(prevLogs => {
            const newLogs = [data, ...prevLogs]
            // Keep only the most recent logs
            return newLogs.slice(0, maxLogs)
          })
        } catch (error) {
          console.error('Error parsing SSE data:', error)
        }
      }

      eventSource.onerror = (error) => {
        console.error('SSE connection error:', error)
        setIsConnected(false)
        setError('Connection lost. Attempting to reconnect...')
        
        // Attempt to reconnect after 3 seconds
        setTimeout(() => {
          if (eventSource.readyState === EventSource.CLOSED) {
            connectToSSE()
          }
        }, 3000)
      }
    } catch (error) {
      console.error('Error connecting to SSE:', error)
      setError('Failed to connect to log stream')
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/stats`)
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const triggerLog = async () => {
    try {
      const response = await fetch(`${API_BASE}/trigger`, {
        method: 'POST'
      })
      if (response.ok) {
        const data = await response.json()
        console.log('Manual log triggered:', data)
      }
    } catch (error) {
      console.error('Error triggering log:', error)
    }
  }

  const clearLogs = () => {
    setLogs([])
  }

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  const getLogTypeColor = (type) => {
    switch (type) {
      case 'ERROR': return 'error'
      case 'WARN': return 'warn'
      case 'INFO':
      case 'DEBUG':
      default: return 'info'
    }
  }

  return (
    <div className="container">
      <h1>SSE Live Logs Viewer</h1>
      
      <div className="status">
        <div className={`status-indicator ${isConnected ? 'connected' : ''}`}></div>
        <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
      </div>

      {stats && (
        <div className="stats">
          <div className="stat-card">
            <div className="stat-value">{stats.connectedClients}</div>
            <div className="stat-label">Connected Clients</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.totalLogs}</div>
            <div className="stat-label">Total Logs</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{Math.floor(stats.uptime)}s</div>
            <div className="stat-label">Uptime</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{Math.round(stats.memoryUsage.heapUsed / 1024 / 1024)}MB</div>
            <div className="stat-label">Memory Usage</div>
          </div>
        </div>
      )}

      <div className="controls">
        <button onClick={triggerLog}>
          Trigger Log
        </button>
        <button onClick={clearLogs} className="danger">
          Clear Logs
        </button>
        <button onClick={fetchStats}>
          Refresh Stats
        </button>
      </div>

      <div className="auto-scroll-toggle">
        <input
          type="checkbox"
          id="auto-scroll"
          checked={autoScroll}
          onChange={(e) => setAutoScroll(e.target.checked)}
        />
        <label htmlFor="auto-scroll">Auto-scroll to bottom</label>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="logs-container">
        {logs.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)' }}>
            No logs yet. Waiting for log entries...
          </div>
        ) : (
          logs.map((log, index) => (
            <div key={`${log.id}-${index}`} className={`log-entry ${getLogTypeColor(log.type)}`}>
              <span className="log-timestamp">{formatTimestamp(log.timestamp)}</span>
              <span className="log-type">[{log.type}]</span>
              <span className="log-message">{log.message}</span>
            </div>
          ))
        )}
        <div ref={logsEndRef} />
      </div>

      <div style={{ marginTop: '1rem', fontSize: '0.875rem', opacity: 0.7 }}>
        <p>Logs are automatically generated every 2-5 seconds.</p>
        <p>Click "Trigger Log" to manually generate a log entry.</p>
        <p>Showing {logs.length} log entries (max: {maxLogs})</p>
      </div>
    </div>
  )
}

export default App
