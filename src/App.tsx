import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentUser } from './services/auth.service';
import { useAppStore } from './lib/store';

// Components
import Layout from './components/layout/Layout';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicOnlyRoute from './components/auth/PublicOnlyRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LevelsPage from './pages/LevelsPage';
import ProblemPage from './pages/ProblemPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { isLoading, theme } = useAppStore();

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<HomePage />} />
          <Route 
            path="login" 
            element={
              <PublicOnlyRoute>
                <LoginPage />
              </PublicOnlyRoute>
            } 
          />
          <Route 
            path="register" 
            element={
              <PublicOnlyRoute>
                <RegisterPage />
              </PublicOnlyRoute>
            } 
          />

          {/* Protected routes */}
          <Route 
            path="dashboard" 
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="levels" 
            element={
              <PrivateRoute>
                <LevelsPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="problem/:level" 
            element={
              <PrivateRoute>
                <ProblemPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="history" 
            element={
              <PrivateRoute>
                <HistoryPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="profile" 
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } 
          />
          
          {/* 404 route */}
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;