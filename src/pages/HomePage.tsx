import React from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../lib/store';
import { Code, BookOpen, BarChart3, Brain, Award } from 'lucide-react';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAppStore();
  
  return (
    <div className="animate-fade-in">
      {/* Hero section */}
      <section className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Master Programming <span className="text-primary-600 dark:text-primary-400">Step by Step</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-gray-600 dark:text-gray-300 sm:text-xl md:mt-5 md:max-w-3xl">
              Learn programming concepts through interactive challenges tailored to your skill level
            </p>
            <div className="mt-10 flex justify-center">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-primary text-base px-8 py-3">
                  Go to Dashboard
                </Link>
              ) : (
                <div className="space-x-4">
                  <Link to="/register" className="btn btn-primary text-base px-8 py-3">
                    Start Learning
                  </Link>
                  <Link to="/login" className="btn btn-outline text-base px-8 py-3">
                    Log In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              How CodeQuest Works
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="card p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-md flex items-center justify-center bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Learn Progressively</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Start with the basics and gradually advance through 10 skill levels.</p>
            </div>
            
            <div className="card p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-md flex items-center justify-center bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-400">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Solve Challenges</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Practice with AI-generated coding problems that test your knowledge.</p>
            </div>
            
            <div className="card p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-md flex items-center justify-center bg-accent-100 dark:bg-accent-900 text-accent-600 dark:text-accent-400">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Track Progress</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">View your learning journey with detailed performance analytics.</p>
            </div>
            
            <div className="card p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-md flex items-center justify-center bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Earn Achievements</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Unlock new levels and earn achievements as you improve your skills.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Levels section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Learning Path
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto">
              Our structured curriculum takes you from beginner to advanced
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-primary-600 dark:bg-primary-500 text-white">
                  1
                </div>
                <h3 className="ml-4 text-lg font-medium">Beginner</h3>
              </div>
              <ul className="mt-2 text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Variables & Data Types</li>
                <li>• Basic Operators</li>
                <li>• Conditional Statements</li>
                <li>• Loops</li>
              </ul>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-secondary-600 dark:bg-secondary-500 text-white">
                  2
                </div>
                <h3 className="ml-4 text-lg font-medium">Intermediate</h3>
              </div>
              <ul className="mt-2 text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Functions</li>
                <li>• Arrays & Objects</li>
                <li>• Error Handling</li>
                <li>• Basic Algorithms</li>
              </ul>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-accent-600 dark:bg-accent-500 text-white">
                  3
                </div>
                <h3 className="ml-4 text-lg font-medium">Advanced</h3>
              </div>
              <ul className="mt-2 text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Advanced Algorithms</li>
                <li>• Data Structures</li>
                <li>• Time & Space Complexity</li>
                <li>• Design Patterns</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-12">
            {isAuthenticated ? (
              <Link to="/levels" className="btn btn-primary text-base px-8 py-3">
                View All Levels
              </Link>
            ) : (
              <Link to="/register" className="btn btn-primary text-base px-8 py-3">
                Start Your Learning Journey
              </Link>
            )}
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Ready to Start Learning?
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-primary-100 mx-auto">
              Join thousands of learners mastering programming with our interactive challenges
            </p>
            <div className="mt-10">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn bg-white text-primary-700 hover:bg-gray-100 text-base px-8 py-3">
                  Go to Dashboard
                </Link>
              ) : (
                <Link to="/register" className="btn bg-white text-primary-700 hover:bg-gray-100 text-base px-8 py-3">
                  Create Free Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;