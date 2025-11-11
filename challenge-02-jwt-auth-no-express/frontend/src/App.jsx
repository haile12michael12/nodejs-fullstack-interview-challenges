import React from 'react';
import { useAuth } from './hooks/useAuth';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';
import './App.css';

const API_BASE = '/api';

function AppContent() {
  const { isLoggedIn, user, login, logout, fetchWithAuth } = useAuth();

  const handleLogin = async (username, password) => {
    try {
      await login(username, password);
    } catch (error) {
      throw error;
    }
  };

  const handleFetchProtectedData = async () => {
    try {
      const response = await fetchWithAuth(`${API_BASE}/protected`);
      if (!response.ok) {
        throw new Error('Failed to fetch protected data');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  if (isLoggedIn) {
    return (
      <Dashboard
        user={user}
        onFetchProtectedData={handleFetchProtectedData}
        onLogout={logout}
      />
    );
  }

  return <LoginForm onLogin={handleLogin} />;
}

function App() {
  return (
    <AuthProvider>
      <div className="container">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;
