import React from 'react';

interface ResponseCardProps {
  message: string;
  timestamp: string;
}

const ResponseCard: React.FC<ResponseCardProps> = ({ message, timestamp }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Echo Response</h3>
          <p className="mt-2 text-gray-600">{message}</p>
        </div>
        <span className="text-sm text-gray-500">{timestamp}</span>
      </div>
    </div>
  );
};

export default ResponseCard;