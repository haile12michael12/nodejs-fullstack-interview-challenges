// Utility for managing SSE connections
class SSEManager {
  constructor() {
    this.clients = new Set();
  }

  addClient(client) {
    this.clients.add(client);
  }

  removeClient(client) {
    this.clients.delete(client);
  }

  broadcast(data) {
    this.clients.forEach(client => {
      this.sendToClient(client, data);
    });
  }

  sendToClient(client, data) {
    try {
      const sseData = `data: ${JSON.stringify(data)}\n\n`;
      client.write(sseData);
    } catch (error) {
      console.error('Error sending SSE message:', error);
      this.removeClient(client);
    }
  }

  getClientCount() {
    return this.clients.size;
  }

  // Send heartbeat to all clients
  sendHeartbeat() {
    this.broadcast({ 
      type: 'heartbeat', 
      timestamp: new Date().toISOString() 
    });
  }
}

module.exports = { SSEManager };