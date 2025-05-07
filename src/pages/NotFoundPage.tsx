import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center px-4 py-12 animate-fade-in">
      <AlertTriangle className="h-16 w-16 text-warning-500 mb-4" />
      
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Page Not Found</h1>
      
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-md text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <div className="mt-8 flex space-x-4">
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="btn btn-outline"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;