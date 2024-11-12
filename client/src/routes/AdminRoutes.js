import React from 'react';
import { Route } from 'react-router-dom';
import FaqUserView from '../components/admin/FaqUserView';
import PolicyUserView from '../components/admin/PolicyUserView';
import AdminDashboard from '../screens/admin/AdminDashboard';
import AdminProfile from '../screens/admin/AdminProfile';
import ManageApplicationPage from '../screens/admin/ManageApplicationPage';
import ManageBusRoutes from '../screens/admin/ManageBusRoutes';
import ManageContents from '../screens/admin/ManageContents';
import ManageTransactionsPage from '../screens/admin/ManageTransactionsPage';
import ManageUserPage from '../screens/admin/ManageUserPage';

const AdminRoutes = [
  <Route path='/admin-dashboard' element={<AdminDashboard />} />,
  <Route path='/manage-user' element={<ManageUserPage />} />,
  <Route path='/manage-applications' element={<ManageApplicationPage />} />,
  <Route path='/manage-bus-routes' element={<ManageBusRoutes />} />,
  <Route path='/manage-bus-routes' element={<ManageBusRoutes />} />,
  <Route path='/manage-transactions' element={<ManageTransactionsPage />} />,
  <Route path='/manage-contents' element={<ManageContents />} />,
  <Route path='/faq' element={<FaqUserView />} />,
  <Route path='/policies' element={<PolicyUserView />} />,
  <Route path='/admin-profile' element={<AdminProfile />} />,
];

export default AdminRoutes;
