import { ReactNode } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import AuthLoading from './AuthLoading';

type RequireAuthProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

const DefaultFallback = () => (
  <div className="text-center">
    <p className="mb-2 text-lg">Vänligen logga in för att se innehållet.</p>
  </div>
);

/**
 * Protects child content behind authentication.
 * Shows a loading state while auth is resolving and a fallback when unauthenticated.
 */
export const RequireAuth = ({ children, fallback }: RequireAuthProps) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <AuthLoading />;
  }

  if (!isAuthenticated) {
    return <>{fallback ?? <DefaultFallback />}</>;
  }

  return <>{children}</>;
};

export default RequireAuth;
