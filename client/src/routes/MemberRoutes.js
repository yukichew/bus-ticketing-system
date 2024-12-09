import React from 'react';
import { Route } from 'react-router-dom';
import Profile from '../screens/user/Profile';
import Trips from '../screens/user/Trips';
import AuthenticatedRoute from './AuthenticatedRoute';

const routesConfig = [
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/trips',
    component: Trips,
  },
];

const MemberRoutes = routesConfig.map(({ path, component: Component }) => (
  <Route
    key={path}
    path={path}
    element={
      <AuthenticatedRoute requiredRole='Member'>
        <Component />
      </AuthenticatedRoute>
    }
  />
));

export default MemberRoutes;
