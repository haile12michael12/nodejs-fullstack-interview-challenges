import React, { useState, useEffect } from 'react';
import EmailForm from '../components/EmailForm';
import NotificationToast from '../components/NotificationToast';
import { api } from '../services/api';

const SendEmailPage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await api.get('/templates');
      setTemplates(response.data);
    } catch (error) {
      setNotification({ message: 'Failed to fetch templates', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async (emailData) => {
    try {
      await api.post('/emails/send', emailData);
      setNotification({ message: 'Email queued for sending', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Failed to send email', type: 'error' });
    }
  };

  const closeNotification = () => {
    setNotification({ message: '', type: '' });
  };

  if (loading) {
    return <div className="p-6">Loading templates...</div>;
  }

  return (
    <div className="p-6">
      <NotificationToast 
        message={notification.message} 
        type={notification.type} 
        onClose={closeNotification} 
      />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Send Email</h1>
        <p className="text-gray-600">Compose and send emails using templates</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <EmailForm 
          templates={templates} 
          onSubmit={handleSendEmail} 
        />
      </div>
    </div>
  );
};

export default SendEmailPage;