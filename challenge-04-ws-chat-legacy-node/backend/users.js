// Global user registry and DM helpers

// Global users storage
const users = new Map();

function generateUserId() {
  return 'user_' + Math.random().toString(36).substr(2, 9);
}

function registerUser(client, username) {
  const userId = generateUserId();
  client.userId = userId;
  client.username = username;
  users.set(userId, client);
  return userId;
}

function getUserById(userId) {
  return users.get(userId);
}

function removeUser(client) {
  if (client.userId) {
    users.delete(client.userId);
  }
}

function getAllUsers() {
  return Array.from(users.values()).map(user => ({
    id: user.userId,
    username: user.username
  }));
}

function findUserByUsername(username) {
  for (const [userId, client] of users.entries()) {
    if (client.username === username) {
      return { id: userId, client };
    }
  }
  return null;
}

// DM (Direct Message) helpers
const dmChannels = new Map();

function createDMChannel(user1Id, user2Id) {
  const channelId = [user1Id, user2Id].sort().join('-');
  if (!dmChannels.has(channelId)) {
    dmChannels.set(channelId, {
      participants: [user1Id, user2Id],
      messages: []
    });
  }
  return channelId;
}

function sendDM(user1Id, user2Id, message) {
  const channelId = createDMChannel(user1Id, user2Id);
  const channel = dmChannels.get(channelId);
  
  const dmMessage = {
    from: user1Id,
    to: user2Id,
    text: message,
    timestamp: new Date().toISOString()
  };
  
  channel.messages.push(dmMessage);
  
  // Keep only last 100 messages
  if (channel.messages.length > 100) {
    channel.messages.shift();
  }
  
  // Send to both participants if they're online
  const user1 = getUserById(user1Id);
  const user2 = getUserById(user2Id);
  
  if (user1 && user1.readyState === WebSocket.OPEN) {
    user1.send(JSON.stringify({
      type: 'dm',
      data: dmMessage
    }));
  }
  
  if (user2 && user2.readyState === WebSocket.OPEN) {
    user2.send(JSON.stringify({
      type: 'dm',
      data: dmMessage
    }));
  }
  
  return dmMessage;
}

function getDMHistory(user1Id, user2Id) {
  const channelId = [user1Id, user2Id].sort().join('-');
  const channel = dmChannels.get(channelId);
  return channel ? channel.messages : [];
}

module.exports = {
  users,
  generateUserId,
  registerUser,
  getUserById,
  removeUser,
  getAllUsers,
  findUserByUsername,
  createDMChannel,
  sendDM,
  getDMHistory
};
