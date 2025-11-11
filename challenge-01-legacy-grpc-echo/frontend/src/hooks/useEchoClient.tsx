import { useState } from 'react';

// Mock gRPC client hook
export const useEchoClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendEcho = async (message: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call the gRPC service
      // For now, we'll simulate the response
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate occasional errors
      if (message.toLowerCase().includes('error')) {
        throw new Error('Simulated error for messages containing "error"');
      }
      
      return { message };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    sendEcho
  };
};