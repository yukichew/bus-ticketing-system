import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { toast } from 'react-toastify';

const AuthenticatedRoute = ({ children, requiredRole }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const [redirectPath, setRedirectPath] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  const handleAuthCheck = () => {
    if (!auth) {
      showError('You need to be logged in to access this page.', '/login');
      return;
    }

    if (requiredRole && auth.role !== requiredRole) {
      showError(
        'You do not have the required permissions to access this page.',
        '/'
      );
      return;
    }

    setIsChecking(false);
  };

  const showError = (message, path) => {
    toast.error(message);
    setTimeout(() => {
      setRedirectPath(path);
    }, 2000);
  };

  useEffect(() => {
    handleAuthCheck();
  }, [auth, requiredRole]);

  if (redirectPath) {
    return (
      <Navigate
        to={redirectPath}
        state={{ from: location.pathname }}
      />
    );
  }

  if (isChecking) {
    return null;
  }

  return children;
};

export default AuthenticatedRoute;
