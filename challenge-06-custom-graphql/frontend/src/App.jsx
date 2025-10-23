import React, { useState } from 'react'

const API_BASE = '/api'

function App() {
  const [query, setQuery] = useState(`query {
  users {
    id
    name
    email
    posts {
      id
      title
      content
    }
  }
}`)
  const [variables, setVariables] = useState('')
  const [result, setResult] = useState('Click "Execute Query" to see results...')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const executeQuery = async () => {
    if (!query.trim()) {
      setError('Please enter a query')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      let variablesObj = {}
      if (variables.trim()) {
        try {
          variablesObj = JSON.parse(variables)
        } catch (e) {
          setError('Invalid JSON in variables')
          setLoading(false)
          return
        }
      }

      const response = await fetch(`${API_BASE}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: query.trim(),
          variables: variablesObj
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setResult(JSON.stringify(data.data, null, 2))
        if (data.data.errors) {
          setError('GraphQL errors: ' + JSON.stringify(data.data.errors, null, 2))
        }
      } else {
        setError(data.error || 'Query execution failed')
      }
    } catch (error) {
      setError('Network error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const clearResult = () => {
    setResult('')
    setError('')
  }

  const loadExample = (exampleQuery, exampleVariables = '') => {
    setQuery(exampleQuery)
    setVariables(exampleVariables)
    setResult('')
    setError('')
  }

  const examples = [
    {
      name: 'Get all users',
      query: `query {
  users {
    id
    name
    email
  }
}`,
      variables: ''
    },
    {
      name: 'Get user with posts',
      query: `query {
  user(id: 1) {
    id
    name
    email
    posts {
      id
      title
      content
    }
  }
}`,
      variables: ''
    },
    {
      name: 'Get all posts',
      query: `query {
  posts {
    id
    title
    content
    author {
      id
      name
      email
    }
  }
}`,
      variables: ''
    },
    {
      name: 'Create a user',
      query: `mutation {
  createUser(name: "New User", email: "newuser@example.com") {
    id
    name
    email
  }
}`,
      variables: ''
    },
    {
      name: 'Create a post',
      query: `mutation {
  createPost(title: "My New Post", content: "This is the content of my post", authorId: 1) {
    id
    title
    content
    author {
      name
      email
    }
  }
}`,
      variables: ''
    },
    {
      name: 'Complex query with variables',
      query: `query GetUserPosts($userId: Int!) {
  user(id: $userId) {
    id
    name
    posts {
      id
      title
    }
  }
}`,
      variables: '{\n  "userId": 1\n}'
    }
  ]

  return (
    <div className="container">
      <h1>GraphQL Client</h1>
      <p>Test queries against the custom GraphQL server</p>
      
      <div className="playground">
        <div className="editor-section">
          <div className="editor-header">
            <h3>Query Editor</h3>
            <div>
              <button onClick={executeQuery} disabled={loading}>
                {loading ? 'Executing...' : 'Execute Query'}
              </button>
              <button className="secondary" onClick={clearResult}>
                Clear
              </button>
            </div>
          </div>
          
          <textarea
            className="textarea"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your GraphQL query here..."
          />
          
          <div className="variables-section">
            <h4>Variables (JSON)</h4>
            <textarea
              className="variables-textarea"
              value={variables}
              onChange={(e) => setVariables(e.target.value)}
              placeholder='{"key": "value"}'
            />
          </div>
        </div>
        
        <div className="result-section">
          <div className="result-header">
            <h3>Result</h3>
            <div>
              {loading && <div className="loading"><div className="spinner"></div>Executing...</div>}
            </div>
          </div>
          
          <div className="result-content">
            {result}
          </div>
          
          {error && <div className="error">{error}</div>}
        </div>
      </div>
      
      <div className="examples">
        <h4>Example Queries</h4>
        <p>Click any example to load it into the editor:</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
          {examples.map((example, index) => (
            <div key={index} className="example-group">
              <h5>{example.name}</h5>
              <div 
                className="example-code"
                onClick={() => loadExample(example.query, example.variables)}
              >
                {example.query.split('\n')[0].trim()}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', fontSize: '0.875rem', opacity: 0.7 }}>
        <p>This client connects to a custom GraphQL server built without Apollo or express-graphql.</p>
        <p>Features: Users, Posts, Queries, Mutations, and nested relationships.</p>
      </div>
    </div>
  )
}

export default App




