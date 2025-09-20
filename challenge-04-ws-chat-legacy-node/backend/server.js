const WebSocket = require('ws');
const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3000;

// Chat rooms and users
const rooms = new Map();
const users = new Map();

// Message types
const MESSAGE_TYPES = {
  JOIN: 'join',
  MESSAGE: 'message',
  LEAVE: 'leave',
  ERROR: 'error',
  SUCCESS: 'success',
  USER_LIST: 'user_list',
  ROOM_LIST: 'room_list'
};

// Utility functions
function generateUserId() {
  return 'user_' + Math.random().toString(36).substr(2, 9);
}

function sanitizeMessage(message) {
  return message.replace(/[<>]/g, '').substring(0, 1000);
}

function createMessage(type, data = {}, error = null) {
  return JSON.stringify({
    type,
    data,
    error,
    timestamp: new Date().toISOString()
  });
}

function broadcastToRoom(roomName, message, excludeUser = null) {
  const room = rooms.get(roomName);
  if (!room) return;

  room.forEach(user => {
    if (user !== excludeUser && user.readyState === WebSocket.OPEN) {
      user.send(message);
    }
  });
}

function getRoomList() {
  return Array.from(rooms.keys());
}

function getUserList(roomName) {
  const room = rooms.get(roomName);
  if (!room) return [];
  
  return Array.from(room).map(user => ({
    id: user.userId,
    username: user.username
  }));
}

// WebSocket server
const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  const urlParams = url.parse(req.url, true);
  const username = urlParams.query.username || 'Anonymous';
  const roomName = urlParams.query.room || 'general';
  
  // Set user properties
  ws.userId = generateUserId();
  ws.username = username;
  ws.roomName = null;
  ws.isAlive = true;

  console.log(`User ${ws.userId} (${username}) connected`);

  // Handle pong responses for heartbeat
  ws.on('pong', () => {
    ws.isAlive = true;
  });

  // Handle incoming messages
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      
      switch (message.type) {
        case MESSAGE_TYPES.JOIN:
          handleJoin(ws, message);
          break;
        case MESSAGE_TYPES.MESSAGE:
          handleMessage(ws, message);
          break;
        case MESSAGE_TYPES.LEAVE:
          handleLeave(ws);
          break;
        default:
          ws.send(createMessage(MESSAGE_TYPES.ERROR, {}, 'Unknown message type'));
      }
    } catch (error) {
      console.error('Error parsing message:', error);
      ws.send(createMessage(MESSAGE_TYPES.ERROR, {}, 'Invalid message format'));
    }
  });

  // Handle connection close
  ws.on('close', () => {
    console.log(`User ${ws.userId} (${ws.username}) disconnected`);
    handleLeave(ws);
  });

  // Handle errors
  ws.on('error', (error) => {
    console.error(`WebSocket error for user ${ws.userId}:`, error);
    handleLeave(ws);
  });

  // Send welcome message
  ws.send(createMessage(MESSAGE_TYPES.SUCCESS, {
    message: 'Connected to chat server',
    userId: ws.userId,
    roomList: getRoomList()
  }));
});

// Message handlers
function handleJoin(ws, message) {
  const roomName = message.data.room || 'general';
  
  // Leave current room if in one
  if (ws.roomName) {
    handleLeave(ws);
  }
  
  // Create room if it doesn't exist
  if (!rooms.has(roomName)) {
    rooms.set(roomName, new Set());
  }
  
  // Add user to room
  rooms.get(roomName).add(ws);
  ws.roomName = roomName;
  
  // Notify room of new user
  const joinMessage = createMessage(MESSAGE_TYPES.SUCCESS, {
    message: `${ws.username} joined the room`,
    user: { id: ws.userId, username: ws.username }
  });
  
  broadcastToRoom(roomName, joinMessage, ws);
  
  // Send user list to the new user
  ws.send(createMessage(MESSAGE_TYPES.USER_LIST, {
    users: getUserList(roomName)
  }));
  
  console.log(`User ${ws.userId} (${ws.username}) joined room: ${roomName}`);
}

function handleMessage(ws, message) {
  if (!ws.roomName) {
    ws.send(createMessage(MESSAGE_TYPES.ERROR, {}, 'You must join a room first'));
    return;
  }
  
  const text = sanitizeMessage(message.data.text || '');
  if (!text.trim()) {
    ws.send(createMessage(MESSAGE_TYPES.ERROR, {}, 'Message cannot be empty'));
    return;
  }
  
  const chatMessage = createMessage(MESSAGE_TYPES.MESSAGE, {
    text,
    user: { id: ws.userId, username: ws.username }
  });
  
  broadcastToRoom(ws.roomName, chatMessage);
  
  console.log(`Message from ${ws.userId} (${ws.username}) in ${ws.roomName}: ${text}`);
}

function handleLeave(ws) {
  if (ws.roomName) {
    const room = rooms.get(ws.roomName);
    if (room) {
      room.delete(ws);
      
      // Remove empty rooms
      if (room.size === 0) {
        rooms.delete(ws.roomName);
      } else {
        // Notify room of user leaving
        const leaveMessage = createMessage(MESSAGE_TYPES.SUCCESS, {
          message: `${ws.username} left the room`,
          user: { id: ws.userId, username: ws.username }
        });
        
        broadcastToRoom(ws.roomName, leaveMessage);
      }
    }
    
    console.log(`User ${ws.userId} (${ws.username}) left room: ${ws.roomName}`);
    ws.roomName = null;
  }
}

// Heartbeat to detect dead connections
const heartbeat = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      console.log(`Terminating dead connection for user ${ws.userId}`);
      handleLeave(ws);
      return ws.terminate();
    }
    
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

// Cleanup on server close
server.on('close', () => {
  clearInterval(heartbeat);
});

// Start server
server.listen(PORT, () => {
  console.log(`WebSocket Chat server running on port ${PORT}`);
  console.log(`WebSocket endpoint: ws://localhost:${PORT}`);
  console.log(`Connect with: ws://localhost:${PORT}?username=YourName&room=general`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down server...');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    process.exit(0);
  });
});
