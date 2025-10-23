import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data.users)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="App">
      <h1>Distributed Tracing Demo</h1>
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh Users'}
      </button>
      
      {error && <div className="error">Error: {error}</div>}
      
      <div className="users">
        <h2>Users</h2>
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>ID: {user.id}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App