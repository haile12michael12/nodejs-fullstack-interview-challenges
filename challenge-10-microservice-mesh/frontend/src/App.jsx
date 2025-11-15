import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import ServiceStatus from './components/ServiceStatus';
import EventLog from './components/EventLog';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create user
  const createUser = async (userData) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('Failed to create user');
      const newUser = await response.json();
      setUsers([...users, newUser]);
      
      // Add event to log
      setEvents(prev => [...prev, {
        id: Date.now(),
        type: 'USER_CREATED',
        message: `User ${newUser.name} created`,
        timestamp: new Date().toISOString()
      }]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete user');
      setUsers(users.filter(user => user.id !== userId));
      
      // Add event to log
      setEvents(prev => [...prev, {
        id: Date.now(),
        type: 'USER_DELETED',
        message: `User deleted`,
        timestamp: new Date().toISOString()
      }]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Microservice Mesh Dashboard</h1>
      </header>
      
      <main>
        {error && (
          <div className="error">
            Error: {error}
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}
        
        <section className="services">
          <h2>Service Status</h2>
          <ServiceStatus />
        </section>
        
        <section className="users">
          <h2>User Management</h2>
          <UserForm onCreate={createUser} />
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <UserList users={users} onDelete={deleteUser} />
          )}
        </section>
        
        <section className="events">
          <h2>Event Log</h2>
          <EventLog events={events} />
        </section>
      </main>
    </div>
  );
}

export default App;