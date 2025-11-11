// Custom React hook for EventSource
import { useState, useEffect, useRef } from 'react';

const API_BASE = '/api';

export const useSSE = (maxLogs = 100) => {
  const [logs, setLogs] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const eventSourceRef = useRef(null);

  useEffect(() => {
    // Connect to SSE stream
    connectToSSE();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const connectToSSE = () => {
    try {
      const eventSource = new EventSource(`${API_BASE}/events`);
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        setIsConnected(true);
        setError('');
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'heartbeat') {
            // Handle heartbeat - just update connection status
            return;
          }

          // Add new log entry
          setLogs(prevLogs => {
            const newLogs = [data, ...prevLogs];
            // Keep only the most recent logs
            return newLogs.slice(0, maxLogs);
          });
        } catch (error) {
          console.error('Error parsing SSE data:', error);
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE connection error:', error);
        setIsConnected(false);
        setError('Connection lost. Attempting to reconnect...');
        
        // Attempt to reconnect after 3 seconds
        setTimeout(() => {
          if (eventSource.readyState === EventSource.CLOSED) {
            connectToSSE();
          }
        }, 3000);
      };
    } catch (error) {
      console.error('Error connecting to SSE:', error);
      setError('Failed to connect to log stream');
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return {
    logs,
    isConnected,
    error,
    clearLogs
  };
};