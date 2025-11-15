import React from 'react';

const UserList = ({ users, onDelete }) => {
  if (users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.id} className="user-card">
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Created: {new Date(user.createdAt).toLocaleString()}</p>
          <p>Updated: {new Date(user.updatedAt).toLocaleString()}</p>
          <button 
            className="danger" 
            onClick={() => onDelete(user.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserList;