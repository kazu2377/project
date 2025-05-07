import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../../lib/store';

interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAppStore();
  const location = useLocation();

  // Get the intended destination, or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    // Already logged in, redirect to the previous page or dashboard
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

export default PublicOnlyRoute;