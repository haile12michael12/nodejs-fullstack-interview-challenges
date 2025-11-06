import React, { useState } from 'react';
import JobList from '../components/JobList';
import { createJob } from '../api/jobs';

const Home = () => {
  const [jobType, setJobType] = useState('email');
  const [payload, setPayload] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    
    if (!payload) {
      setSubmitError('Payload is required');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      let parsedPayload;
      try {
        parsedPayload = JSON.parse(payload);
      } catch (err) {
        setSubmitError('Invalid JSON in payload');
        return;
      }

      const jobData = {
        type: jobType,
        payload: parsedPayload,
      };

      await createJob(jobData);
      
      setSubmitSuccess('Job created successfully!');
      setPayload('');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSubmitSuccess(null), 3000);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Background Jobs Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Create New Job</h2>
            
            {submitSuccess && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                {submitSuccess}
              </div>
            )}
            
            {submitError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {submitError}
              </div>
            )}
            
            <form onSubmit={handleCreateJob}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Job Type
                </label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                >
                  <option value="email">Email</option>
                  <option value="image_processing">Image Processing</option>
                  <option value="data_export">Data Export</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Payload (JSON)
                </label>
                <textarea
                  value={payload}
                  onChange={(e) => setPayload(e.target.value)}
                  placeholder='{ "to": "user@example.com", "subject": "Hello", "body": "World" }'
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  rows="6"
                  disabled={isSubmitting}
                />
              </div>
              
              <button
                type="submit"
                className={`w-full px-4 py-2 text-white rounded-md ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Job'}
              </button>
            </form>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <JobList />
        </div>
      </div>
    </div>
  );
};

export default Home;