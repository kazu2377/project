import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../../lib/store';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAppStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page but save the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;