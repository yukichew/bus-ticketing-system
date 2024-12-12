import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../screens/auth/Login';
import EmailVerification from '../screens/auth/EmailVerification';
import OTPVerification from '../screens/auth/OTPVerification';
import UserRegistration from '../screens/auth/UserRegistration';
import BORegistration from '../screens/auth/BORegistration';
import ResetPassword from '../screens/auth/ResetPassword';
import ChangePassword from '../screens/auth/ChangePassword';
import AuthenticatedRoute from './AuthenticatedRoute';

const AuthRoutes = [
  <Route
    path='/login'
    element={<Login />}
  />,
  <Route
    path='/email-verification'
    element={<EmailVerification />}
  />,
  <Route
    path='/otp-verification'
    element={<OTPVerification />}
  />,
  <Route
    path='/user-registration'
    element={<UserRegistration />}
  />,
  <Route
    path='/bus-operator-registration'
    element={<BORegistration />}
  />,
  <Route
    path='/reset-password'
    element={<ResetPassword />}
  />,
  <Route
    path='/change-password'
    element={
      <AuthenticatedRoute>
        <ChangePassword />
      </AuthenticatedRoute>
    }
  />,
];

export default AuthRoutes;
