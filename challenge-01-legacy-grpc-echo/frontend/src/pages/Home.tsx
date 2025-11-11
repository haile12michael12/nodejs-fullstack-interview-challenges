import React, { useState } from 'react';
import EchoForm from '../components/EchoForm';
import ResponseCard from '../components/ResponseCard';
import { useEchoClient } from '../hooks/useEchoClient';

const Home: React.FC = () => {
  const [responses, setResponses] = useState<Array<{ message: string; timestamp: string }>>([]);
  const { sendEcho } = useEchoClient();

  const handleEcho = async (message: string) => {
    try {
      const response = await sendEcho(message);
      setResponses(prev => [
        {
          message: response.message,
          timestamp: new Date().toLocaleTimeString()
        },
        ...prev
      ]);
    } catch (error) {
      console.error('Echo failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      <EchoForm onEcho={handleEcho} />
      
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Echo Responses</h2>
        {responses.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-500">No responses yet. Send a message to see the echo.</p>
          </div>
        ) : (
          <div>
            {responses.map((response, index) => (
              <ResponseCard
                key={index}
                message={response.message}
                timestamp={response.timestamp}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;