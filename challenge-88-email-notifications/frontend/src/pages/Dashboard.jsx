import React, { useState, useEffect } from 'react';
import TemplateForm from '../components/TemplateForm';
import EmailForm from '../components/EmailForm';
import EmailStatusList from '../components/EmailStatusList';
import NotificationToast from '../components/NotificationToast';
import { api } from '../services/api';
import useFetch from '../hooks/useFetch';

const Dashboard = () => {
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  
  const { data: templates, loading: templatesLoading, refetch: refetchTemplates } = useFetch('/templates');
  const { data: emails, loading: emailsLoading, refetch: refetchEmails } = useFetch('/emails');

  const handleCreateTemplate = async (templateData) => {
    try {
      await api.post('/templates', templateData);
      setNotification({ message: 'Template created successfully', type: 'success' });
      setShowTemplateForm(false);
      setEditingTemplate(null);
      refetchTemplates();
    } catch (error) {
      setNotification({ message: 'Failed to create template', type: 'error' });
    }
  };

  const handleUpdateTemplate = async (templateData) => {
    try {
      await api.put(`/templates/${editingTemplate.id}`, templateData);
      setNotification({ message: 'Template updated successfully', type: 'success' });
      setShowTemplateForm(false);
      setEditingTemplate(null);
      refetchTemplates();
    } catch (error) {
      setNotification({ message: 'Failed to update template', type: 'error' });
    }
  };

  const handleSendEmail = async (emailData) => {
    try {
      await api.post('/emails/send', emailData);
      setNotification({ message: 'Email queued for sending', type: 'success' });
      refetchEmails();
    } catch (error) {
      setNotification({ message: 'Failed to send email', type: 'error' });
    }
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setShowTemplateForm(true);
  };

  const closeNotification = () => {
    setNotification({ message: '', type: '' });
  };

  return (
    <div>
      <NotificationToast 
        message={notification.message} 
        type={notification.type} 
        onClose={closeNotification} 
      />
      
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <button
          onClick={() => setShowTemplateForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Template
        </button>
      </div>

      {showTemplateForm && (
        <div className="mb-6">
          <TemplateForm
            template={editingTemplate}
            onSubmit={editingTemplate ? handleUpdateTemplate : handleCreateTemplate}
            onCancel={() => {
              setShowTemplateForm(false);
              setEditingTemplate(null);
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <EmailForm 
            templates={templates || []} 
            onSubmit={handleSendEmail} 
          />
        </div>
        <div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Templates</h2>
            {templatesLoading ? (
              <p>Loading templates...</p>
            ) : (
              <div className="space-y-4">
                {(templates || []).map(template => (
                  <div key={template.id} className="border rounded p-4">
                    <h3 className="font-semibold">{template.name}</h3>
                    <p className="text-gray-600 text-sm">{template.subject}</p>
                    <div className="mt-2">
                      <button
                        onClick={() => handleEditTemplate(template)}
                        className="text-blue-500 hover:text-blue-700 text-sm mr-2"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        {emailsLoading ? (
          <p>Loading emails...</p>
        ) : (
          <EmailStatusList emails={emails || []} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;