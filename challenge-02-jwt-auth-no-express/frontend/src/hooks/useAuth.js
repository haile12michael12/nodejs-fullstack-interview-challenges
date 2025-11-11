// Custom hook for authentication
import { useState, useEffect } from 'react';

const API_BASE = '/api';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch(`${API_BASE}/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsLoggedIn(true);
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      setUser(data.user);
      setIsLoggedIn(true);
      return data;
    } else {
      throw new Error(data.error || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    setUser(null);
  };

  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await fetch(`${API_BASE}/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data.token;
      } else {
        throw new Error('Refresh failed');
      }
    } catch (error) {
      logout();
      throw error;
    }
  };

  const fetchWithAuth = async (url, options = {}) => {
    let token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    // Add auth header
    const authOptions = {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      }
    };

    let response = await fetch(url, authOptions);

    // If unauthorized and we have a refresh token, try to refresh
    if (response.status === 401 && refreshToken) {
      try {
        token = await refreshAccessToken(refreshToken);
        // Retry the request with new token
        authOptions.headers['Authorization'] = `Bearer ${token}`;
        response = await fetch(url, authOptions);
      } catch (error) {
        // Refresh failed, logout
        logout();
        throw new Error('Session expired. Please log in again.');
      }
    }

    return response;
  };

  return {
    isLoggedIn,
    user,
    loading,
    login,
    logout,
    fetchWithAuth
  };
};