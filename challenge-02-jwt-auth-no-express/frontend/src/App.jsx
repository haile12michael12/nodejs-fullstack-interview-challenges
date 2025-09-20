import React, { useState, useEffect } from 'react'

const API_BASE = '/api'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [protectedData, setProtectedData] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token')
    if (token) {
      fetchUserInfo(token)
    }
  }, [])

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch(`${API_BASE}/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
        setIsLoggedIn(true)
        setError('')
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
      }
    } catch (error) {
      console.error('Error fetching user info:', error)
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('refreshToken', data.refreshToken)
        setUser(data.user)
        setIsLoggedIn(true)
        setUsername('')
        setPassword('')
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    setUser(null)
    setProtectedData(null)
    setError('')
  }

  const fetchProtectedData = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch(`${API_BASE}/protected`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setProtectedData(data)
      } else if (response.status === 401) {
        // Try to refresh token
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          await refreshAccessToken(refreshToken)
          // Retry the request
          return fetchProtectedData()
        } else {
          handleLogout()
        }
      } else {
        setError('Failed to fetch protected data')
      }
    } catch (error) {
      setError('Network error')
    }
  }

  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await fetch(`${API_BASE}/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.token)
      } else {
        throw new Error('Refresh failed')
      }
    } catch (error) {
      handleLogout()
      throw error
    }
  }

  if (isLoggedIn) {
    return (
      <div className="container">
        <h1>Welcome, {user?.username}!</h1>
        
        <div className="user-info">
          <h3>User Information</h3>
          <p><strong>ID:</strong> {user?.id}</p>
          <p><strong>Username:</strong> {user?.username}</p>
        </div>

        <button onClick={fetchProtectedData}>
          Fetch Protected Data
        </button>

        {protectedData && (
          <div className="protected-content">
            <h3>Protected Data</h3>
            <p><strong>Message:</strong> {protectedData.message}</p>
            <p><strong>Timestamp:</strong> {new Date(protectedData.timestamp).toLocaleString()}</p>
            <p><strong>User ID:</strong> {protectedData.userId}</p>
          </div>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

        {error && <div className="error">{error}</div>}
      </div>
    )
  }

  return (
    <div className="container">
      <h1>JWT Authentication</h1>
      
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={{ marginTop: '1rem', fontSize: '0.875rem', opacity: 0.7 }}>
        <p>Test users:</p>
        <p>• admin / password123</p>
        <p>• user / user123</p>
      </div>

      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default App
