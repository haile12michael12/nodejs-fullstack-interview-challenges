import React, { useState, useEffect, useRef } from 'react'

const WS_URL = 'ws://localhost:3000'

function App() {
  const [username, setUsername] = useState('')
  const [currentRoom, setCurrentRoom] = useState('general')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState('')
  const [reconnectAttempts, setReconnectAttempts] = useState(0)
  const [showReconnectInfo, setShowReconnectInfo] = useState(false)
  
  const wsRef = useRef(null)
  const messagesEndRef = useRef(null)
  const reconnectTimeoutRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const connectWebSocket = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return
    }

    setIsConnecting(true)
    setError('')

    const wsUrl = `${WS_URL}?username=${encodeURIComponent(username)}&room=${encodeURIComponent(currentRoom)}`
    
    try {
      const ws = new WebSocket(wsUrl)
      wsRef.current = ws

      ws.onopen = () => {
        console.log('WebSocket connected')
        setIsConnected(true)
        setIsConnecting(false)
        setReconnectAttempts(0)
        setShowReconnectInfo(false)
        
        // Join the room
        ws.send(JSON.stringify({
          type: 'join',
          data: { room: currentRoom }
        }))
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          handleMessage(data)
        } catch (error) {
          console.error('Error parsing message:', error)
        }
      }

      ws.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason)
        setIsConnected(false)
        setIsConnecting(false)
        
        if (event.code !== 1000) { // Not a normal closure
          handleReconnect()
        }
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        setError('Connection error occurred')
        setIsConnecting(false)
      }

    } catch (error) {
      console.error('Error creating WebSocket:', error)
      setError('Failed to connect to chat server')
      setIsConnecting(false)
    }
  }

  const handleReconnect = () => {
    if (reconnectAttempts >= 5) {
      setError('Max reconnection attempts reached. Please refresh the page.')
      return
    }

    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000) // Exponential backoff, max 30s
    setReconnectAttempts(prev => prev + 1)
    setShowReconnectInfo(true)

    reconnectTimeoutRef.current = setTimeout(() => {
      console.log(`Attempting to reconnect... (attempt ${reconnectAttempts + 1})`)
      connectWebSocket()
    }, delay)
  }

  const handleMessage = (data) => {
    switch (data.type) {
      case 'success':
        if (data.data.message) {
          setMessages(prev => [...prev, {
            id: Date.now() + Math.random(),
            type: 'system',
            text: data.data.message,
            timestamp: data.timestamp
          }])
        }
        break

      case 'user_list':
        setUsers(data.data.users || [])
        break

      case 'message':
        setMessages(prev => [...prev, {
          id: Date.now() + Math.random(),
          type: 'chat',
          text: data.data.text,
          user: data.data.user,
          timestamp: data.timestamp,
          isOwn: data.data.user.id === wsRef.current?.userId
        }])
        break

      case 'error':
        setError(data.error || 'Unknown error occurred')
        break

      default:
        console.log('Unknown message type:', data.type)
    }
  }

  const sendMessage = () => {
    if (!newMessage.trim() || !isConnected) return

    wsRef.current?.send(JSON.stringify({
      type: 'message',
      data: { text: newMessage.trim() }
    }))

    setNewMessage('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const changeRoom = (newRoom) => {
    if (newRoom === currentRoom || !isConnected) return

    setCurrentRoom(newRoom)
    setMessages([])
    setUsers([])

    wsRef.current?.send(JSON.stringify({
      type: 'join',
      data: { room: newRoom }
    }))
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      if (wsRef.current) {
        wsRef.current.close(1000, 'Component unmounting')
      }
    }
  }, [])

  // Login form
  if (!username) {
    return (
      <div className="login-form">
        <h1>WebSocket Chat</h1>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && username.trim() && connectWebSocket()}
            placeholder="Enter your username"
            autoFocus
          />
        </div>
        <button 
          onClick={connectWebSocket}
          disabled={!username.trim() || isConnecting}
        >
          {isConnecting ? 'Connecting...' : 'Join Chat'}
        </button>
        {error && <div className="error">{error}</div>}
      </div>
    )
  }

  return (
    <div className="container">
      <div className="chat-header">
        <div className="connection-status">
          <div className={`status-indicator ${isConnected ? 'connected' : isConnecting ? 'connecting' : ''}`}></div>
          <span>{isConnected ? 'Connected' : isConnecting ? 'Connecting...' : 'Disconnected'}</span>
        </div>
        
        <div className="room-info">
          <div className="room-selector">
            <label htmlFor="room-select">Room:</label>
            <select
              id="room-select"
              value={currentRoom}
              onChange={(e) => changeRoom(e.target.value)}
              disabled={!isConnected}
            >
              <option value="general">General</option>
              <option value="random">Random</option>
              <option value="tech">Tech</option>
              <option value="gaming">Gaming</option>
            </select>
          </div>
          
          <button onClick={connectWebSocket} disabled={isConnecting || isConnected}>
            {isConnecting ? 'Connecting...' : 'Reconnect'}
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type} ${message.isOwn ? 'own' : 'other'}`}>
            <div className="message-header">
              <span className="message-user">
                {message.user ? message.user.username : 'System'}
              </span>
              <span className="message-time">{formatTime(message.timestamp)}</span>
            </div>
            <div className="message-text">{message.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          disabled={!isConnected}
        />
        <button onClick={sendMessage} disabled={!isConnected || !newMessage.trim()}>
          Send
        </button>
      </div>

      {users.length > 0 && (
        <div className="user-list">
          <h4>Online ({users.length})</h4>
          {users.map((user) => (
            <div key={user.id} className="user-item">
              {user.username}
            </div>
          ))}
        </div>
      )}

      {error && <div className="error">{error}</div>}
      
      {showReconnectInfo && (
        <div className="reconnect-info">
          Attempting to reconnect... (Attempt {reconnectAttempts + 1}/5)
        </div>
      )}
    </div>
  )
}

export default App
