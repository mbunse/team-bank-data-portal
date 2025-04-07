import React from 'react';
import { useAuth } from '@/context/AuthContext';

// This component is now deprecated as we're using a login dialog instead
// Keeping it as a stub for backward compatibility
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // We now always render children, and the login dialog is shown if not authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
