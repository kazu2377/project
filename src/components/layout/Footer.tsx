import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Code className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">CodeQuest</span>
            </Link>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Help
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4 flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-500 dark:text-gray-400">
          <p>© {currentYear} CodeQuest. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by CodeQuest Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;