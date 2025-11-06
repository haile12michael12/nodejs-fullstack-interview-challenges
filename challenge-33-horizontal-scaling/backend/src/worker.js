const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const routes = require('./routes');
const sessionStore = require('./lib/sessionStore');
const gracefulShutdown = require('./lib/gracefulShutdown');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(sessionStore.middleware);

// Routes
app.use('/api', routes);

// Socket.io connection
io.on('connection', (socket) => {
  console.log(`Worker ${process.pid}: User connected`);
  
  socket.on('message', (data) => {
    // Broadcast to all clients
    io.emit('message', { workerId: process.pid, ...data });
  });
  
  socket.on('disconnect', () => {
    console.log(`Worker ${process.pid}: User disconnected`);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    workerId: process.pid,
    timestamp: new Date().toISOString()
  });
});

server.listen(PORT, () => {
  console.log(`Worker ${process.pid}: Server running on port ${PORT}`);
});

// Graceful shutdown
gracefulShutdown(server, io);

module.exports = { app, server, io };