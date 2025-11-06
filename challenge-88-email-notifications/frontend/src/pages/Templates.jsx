import React, { useState, useEffect } from 'react';
import TemplateForm from '../components/TemplateForm';
import NotificationToast from '../components/NotificationToast';
import { api } from '../services/api';

const TemplatesPage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
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

  const handleCreateTemplate = async (templateData) => {
    try {
      await api.post('/templates', templateData);
      setNotification({ message: 'Template created successfully', type: 'success' });
      setShowForm(false);
      fetchTemplates();
    } catch (error) {
      setNotification({ message: 'Failed to create template', type: 'error' });
    }
  };

  const handleUpdateTemplate = async (templateData) => {
    try {
      await api.put(`/templates/${editingTemplate.id}`, templateData);
      setNotification({ message: 'Template updated successfully', type: 'success' });
      setShowForm(false);
      setEditingTemplate(null);
      fetchTemplates();
    } catch (error) {
      setNotification({ message: 'Failed to update template', type: 'error' });
    }
  };

  const handleDeleteTemplate = async (id) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await api.delete(`/templates/${id}`);
        setNotification({ message: 'Template deleted successfully', type: 'success' });
        fetchTemplates();
      } catch (error) {
        setNotification({ message: 'Failed to delete template', type: 'error' });
      }
    }
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setShowForm(true);
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
      
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Email Templates</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Template
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <TemplateForm
            template={editingTemplate}
            onSubmit={editingTemplate ? handleUpdateTemplate : handleCreateTemplate}
            onCancel={() => {
              setShowForm(false);
              setEditingTemplate(null);
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{template.name}</h2>
            <p className="text-gray-600 mb-4">{template.subject}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditTemplate(template)}
                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTemplate(template.id)}
                className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;