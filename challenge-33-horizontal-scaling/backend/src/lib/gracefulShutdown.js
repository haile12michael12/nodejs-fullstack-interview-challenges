function gracefulShutdown(server, io) {
  let connections = [];
  
  // Track connections
  server.on('connection', (conn) => {
    connections.push(conn);
    conn.on('close', () => {
      connections = connections.filter(c => c !== conn);
    });
  });

  // Graceful shutdown handler
  const shutdown = () => {
    console.log(`Worker ${process.pid}: Received shutdown signal, closing server...`);
    
    // Close server to stop accepting new connections
    server.close(() => {
      console.log(`Worker ${process.pid}: Server closed`);
    });
    
    // Close all active connections
    connections.forEach(conn => {
      conn.end();
    });
    
    // Close Socket.IO
    if (io) {
      io.close(() => {
        console.log(`Worker ${process.pid}: Socket.IO closed`);
      });
    }
    
    // Close Redis connections
    const sessionStore = require('./sessionStore');
    if (sessionStore.client) {
      sessionStore.client.quit();
    }
    
    // Force close after 10 seconds
    setTimeout(() => {
      console.error(`Worker ${process.pid}: Could not close connections in time, forcefully shutting down`);
      process.exit(1);
    }, 10000);
  };

  // Listen for shutdown signals
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
  
  return shutdown;
}

module.exports = gracefulShutdown;