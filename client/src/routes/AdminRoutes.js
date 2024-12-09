import React from 'react';
import { Route } from 'react-router-dom';
import AdminDashboard from '../screens/admin/AdminDashboard';
import AdminProfile from '../screens/admin/AdminProfile';
import ManageApplicationPage from '../screens/admin/ManageApplicationPage';
import ManageBusRoutes from '../screens/admin/ManageBusRoutes';
import ManageContents from '../screens/admin/ManageContents';
import ManageTransactionsPage from '../screens/admin/ManageTransactionsPage';
import ManageUserPage from '../screens/admin/ManageUserPage';
import ManageReviews from '../screens/admin/ManageReviews';
import AuthenticatedRoute from './AuthenticatedRoute';

const routesConfig = [
  { path: '/admin-dashboard', component: AdminDashboard },
  { path: '/manage-user', component: ManageUserPage },
  { path: '/manage-applications', component: ManageApplicationPage },
  { path: '/manage-bus-routes', component: ManageBusRoutes },
  { path: '/manage-transactions', component: ManageTransactionsPage },
  { path: '/manage-contents', component: ManageContents },
  { path: '/admin-profile', component: AdminProfile },
  { path: '/manage-reviews', component: ManageReviews },
];

const AdminRoutes = routesConfig.map(({ path, component: Component }) => (
  <Route
    key={path}
    path={path}
    element={
      <AuthenticatedRoute requiredRole='Admin'>
        <Component />
      </AuthenticatedRoute>
    }
  />
));

export default AdminRoutes;
