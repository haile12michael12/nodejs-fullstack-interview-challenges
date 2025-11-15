import { useState, useEffect } from 'react'
import './App.css'
import ItemList from './components/ItemList'
import ItemForm from './components/ItemForm'
import Navbar from './components/Navbar'

function App() {
  const [items, setItems] = useState({})
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch all items
  const fetchItems = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/items')
      if (!response.ok) throw new Error('Failed to fetch items')
      const data = await response.json()
      setItems(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')
      const data = await response.json()
      setStats(data)
    } catch (err) {
      setError(err.message)
    }
  }

  // Create item
  const createItem = async (key, value) => {
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value })
      })
      if (!response.ok) throw new Error('Failed to create item')
      await fetchItems()
      await fetchStats()
    } catch (err) {
      setError(err.message)
    }
  }

  // Update item
  const updateItem = async (key, value) => {
    try {
      const response = await fetch(`/api/items/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value })
      })
      if (!response.ok) throw new Error('Failed to update item')
      await fetchItems()
    } catch (err) {
      setError(err.message)
    }
  }

  // Delete item
  const deleteItem = async (key) => {
    try {
      const response = await fetch(`/api/items/${key}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete item')
      await fetchItems()
      await fetchStats()
    } catch (err) {
      setError(err.message)
    }
  }

  // Clear all items
  const clearItems = async () => {
    try {
      const response = await fetch('/api/items', {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to clear items')
      await fetchItems()
      await fetchStats()
    } catch (err) {
      setError(err.message)
    }
  }

  // Load data on component mount
  useEffect(() => {
    fetchItems()
    fetchStats()
  }, [])

  return (
    <div className="App">
      <Navbar />
      <main>
        <div className="container">
          <h1>REPL Fullstack App</h1>
          
          {error && (
            <div className="error">
              Error: {error}
              <button onClick={() => setError(null)}>×</button>
            </div>
          )}
          
          <div className="stats">
            <h2>Statistics</h2>
            <p>Total items: {stats.totalItems || 0}</p>
            {stats.totalSize && <p>Total size: {stats.totalSize} bytes</p>}
          </div>
          
          <ItemForm onCreate={createItem} />
          
          <div className="actions">
            <button onClick={fetchItems}>Refresh</button>
            <button onClick={clearItems} className="danger">Clear All</button>
          </div>
          
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ItemList 
              items={items} 
              onUpdate={updateItem} 
              onDelete={deleteItem} 
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App