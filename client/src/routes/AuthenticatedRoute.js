import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const AuthenticatedRoute = ({ children, requiredRole }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log('AuthenticatedRoute: ', auth);

  if (!auth) {
    return (
      <Navigate
        to='/login'
        state={{ from: location.pathname }}
      />
    );
  }

  if (requiredRole && auth.role !== requiredRole) {
    return (
      <Navigate
        to='/'
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
};

export default AuthenticatedRoute;
