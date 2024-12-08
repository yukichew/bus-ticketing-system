import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const AuthenticatedRoute = ({ requiredRole }) => {
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

  return <Outlet />;
};

export default AuthenticatedRoute;
