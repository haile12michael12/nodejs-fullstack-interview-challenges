// Room management utilities

// Chat rooms storage
const rooms = new Map();

function createRoom(roomName) {
  if (!rooms.has(roomName)) {
    rooms.set(roomName, new Set());
  }
  return rooms.get(roomName);
}

function deleteRoom(roomName) {
  return rooms.delete(roomName);
}

function getRoom(roomName) {
  return rooms.get(roomName);
}

function addClientToRoom(roomName, client) {
  const room = createRoom(roomName);
  room.add(client);
  return room;
}

function removeClientFromRoom(roomName, client) {
  const room = getRoom(roomName);
  if (room) {
    room.delete(client);
    // Remove empty rooms
    if (room.size === 0) {
      deleteRoom(roomName);
    }
    return true;
  }
  return false;
}

function broadcastToRoom(roomName, message, excludeClient = null) {
  const room = getRoom(roomName);
  if (!room) return;

  room.forEach(client => {
    if (client !== excludeClient && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

function getRoomList() {
  return Array.from(rooms.keys());
}

function getUserList(roomName) {
  const room = getRoom(roomName);
  if (!room) return [];
  
  return Array.from(room).map(client => ({
    id: client.userId,
    username: client.username
  }));
}

module.exports = {
  rooms,
  createRoom,
  deleteRoom,
  getRoom,
  addClientToRoom,
  removeClientFromRoom,
  broadcastToRoom,
  getRoomList,
  getUserList
};
