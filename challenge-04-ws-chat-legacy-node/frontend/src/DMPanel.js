// Private DM sender component
import React, { useState } from 'react';

const DMPanel = ({ onSendDM, users, currentUser }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!selectedUser || !message.trim()) return;
    
    onSendDM(selectedUser, message.trim());
    setMessage('');
  };

  const availableUsers = users.filter(user => user.id !== currentUser.id);

  return (
    <div className="dm-panel">
      <h3>Send Direct Message</h3>
      <div className="dm-form">
        <select 
          value={selectedUser} 
          onChange={(e) => setSelectedUser(e.target.value)}
          disabled={availableUsers.length === 0}
        >
          <option value="">Select a user</option>
          {availableUsers.map(user => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          rows="3"
        />
        <button 
          onClick={handleSend} 
          disabled={!selectedUser || !message.trim()}
        >
          Send DM
        </button>
      </div>
    </div>
  );
};

export default DMPanel;