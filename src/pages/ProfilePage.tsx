import React from 'react';
import { useAppStore } from '../lib/store';
import ProfileForm from '../components/profile/ProfileForm';
import { User } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAppStore();
  
  const handleLogout = async () => {
    await logout();
  };
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center mb-8">
        <User className="h-8 w-8 mr-3 text-primary-600 dark:text-primary-400" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Profile</h1>
      </div>
      
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-6">Account Information</h2>
        <ProfileForm />
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-4">Account Actions</h3>
          <button
            onClick={handleLogout}
            className="btn btn-outline text-error-600 dark:text-error-500 border-error-600 dark:border-error-500 hover:bg-error-50 dark:hover:bg-error-900/20"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;