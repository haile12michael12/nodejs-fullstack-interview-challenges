import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real implementation, this would use gRPC-Web to call the backend
      // For simplicity, we're using a REST endpoint that would be provided by a proxy
      const res = await fetch('http://localhost:8080/echo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      console.error('Error calling Echo service:', error);
      setResponse('Error: Could not connect to the Echo service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>gRPC Echo Service</h1>
        <p>Enter a message to echo back from the gRPC server</p>
      </header>
      
      <main>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <input
              type="text"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter a message"
              required
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
        
        {response && (
          <div className="response">
            <h2>Response:</h2>
            <p>{response}</p>
          </div>
        )}
      </main>
      
      <footer>
        <p>Challenge 01 - Legacy gRPC Echo</p>
      </footer>
    </div>
  );
}

export default App;