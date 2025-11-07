import React from 'react';
import UserForm from '../components/UserForm';

const UserPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">User Validation</h1>
          <p className="mt-2 text-gray-600">Validate and submit user data with proper validation</p>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <UserForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserPage;