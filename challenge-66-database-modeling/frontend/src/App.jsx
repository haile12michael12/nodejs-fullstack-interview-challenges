import React, { useState, useEffect } from 'react'

function App() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      // In a real app, you would fetch from your API
      // const response = await fetch('/api/users')
      // const data = await response.json()
      // setUsers(data)
      
      // Mock data for demonstration
      setUsers([
        {
          id: 1,
          username: 'johndoe',
          email: 'john@example.com',
          first_name: 'John',
          last_name: 'Doe',
          bio: 'Software developer'
        }
      ])
    } catch (err) {
      setError('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      // In a real app, you would fetch from your API
      // const response = await fetch('/api/posts')
      // const data = await response.json()
      // setPosts(data.posts)
      
      // Mock data for demonstration
      setPosts([
        {
          id: 1,
          title: 'Understanding Database Relationships',
          content: 'This is a comprehensive guide to database relationships...',
          slug: 'understanding-database-relationships',
          status: 'published',
          published_at: new Date().toISOString(),
          author: {
            id: 1,
            username: 'johndoe',
            first_name: 'John',
            last_name: 'Doe'
          },
          tags: [
            { id: 1, name: 'technology' },
            { id: 2, name: 'programming' }
          ]
        }
      ])
    } catch (err) {
      setError('Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
    fetchPosts()
  }, [])

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1>Database Modeling Challenge</h1>
      <p>Frontend for testing database relationships and modeling</p>
      
      {error && (
        <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
          {error}
        </div>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Users Section */}
        <div>
          <h2>Users</h2>
          <button onClick={fetchUsers} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh Users'}
          </button>
          
          {users.length === 0 && !loading ? (
            <p>No users found.</p>
          ) : (
            <div style={{ marginTop: '15px' }}>
              {users.map(user => (
                <div key={user.id} style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '4px', 
                  padding: '15px', 
                  marginBottom: '10px',
                  backgroundColor: '#f9f9f9'
                }}>
                  <h3>{user.username}</h3>
                  <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Bio:</strong> {user.bio}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Posts Section */}
        <div>
          <h2>Posts</h2>
          <button onClick={fetchPosts} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh Posts'}
          </button>
          
          {posts.length === 0 && !loading ? (
            <p>No posts found.</p>
          ) : (
            <div style={{ marginTop: '15px' }}>
              {posts.map(post => (
                <div key={post.id} style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '4px', 
                  padding: '15px', 
                  marginBottom: '10px',
                  backgroundColor: '#f9f9f9'
                }}>
                  <h3>{post.title}</h3>
                  <p><strong>Author:</strong> {post.author.first_name} {post.author.last_name}</p>
                  <p><strong>Status:</strong> {post.status}</p>
                  <p><strong>Published:</strong> {new Date(post.published_at).toLocaleDateString()}</p>
                  <p>{post.content.substring(0, 100)}...</p>
                  <div>
                    <strong>Tags:</strong>
                    {post.tags.map(tag => (
                      <span key={tag.id} style={{ 
                        backgroundColor: '#007acc', 
                        color: 'white', 
                        padding: '2px 6px', 
                        borderRadius: '3px', 
                        marginRight: '5px',
                        fontSize: '0.8em'
                      }}>
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App