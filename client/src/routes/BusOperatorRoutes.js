import React from 'react';
import { Route } from 'react-router-dom';
import BODashboard from '../screens/busOperator/BODashboard';
import BORatesAndReviews from '../screens/busOperator/BORatesAndReviews';
import EditBusScheduleForm from '../screens/busOperator/busManagement/EditBusScheduleForm';
import EditBusTypeForm from '../screens/busOperator/busManagement/EditBusTypeForm';
import ManageBus from '../screens/busOperator/busManagement/ManageBus';
import NewBusScheduleForm from '../screens/busOperator/busManagement/NewBusScheduleForm';
import NewBusTypeForm from '../screens/busOperator/busManagement/NewBusTypeForm';
import NewBusForm from '../screens/busOperator/busManagement/NewBusForm';
import EditBusForm from '../screens/busOperator/busManagement/EditBusForm';
import PassengerList from '../screens/busOperator/busManagement/PassengerList';
import UserProfile from '../screens/busOperator/profile/UserProfile';
import AuthenticatedRoute from './AuthenticatedRoute';

const routesConfig = [
  { path: '/bo/dashboard', component: BODashboard },
  { path: '/bo/user-profile', component: UserProfile },
  { path: '/bo/bus', component: ManageBus },
  { path: '/bo/bus/new-bus', component: NewBusForm },
  { path: '/bo/bus/edit-bus/:busID', component: EditBusForm },
  { path: '/bo/bus/new-bus-type', component: NewBusTypeForm },
  { path: '/bo/bus/edit-bus-type/:busTypeID', component: EditBusTypeForm },
  { path: '/bo/bus/new-bus-schedule', component: NewBusScheduleForm },
  { path: '/bo/bus/edit-bus-schedule/:busScheduleID', component: EditBusScheduleForm },
  { path: '/bo/bus/bus-schedule/passenger-lists/:busScheduleID', component: PassengerList },
  { path: '/bo/rates-and-reviews', component: BORatesAndReviews },
];

const BusOperatorRoutes = routesConfig.map(({ path, component: Component }) => (
  <Route
    key={path}
    path={path}
    element={
      <AuthenticatedRoute requiredRole='BusOperator'>
        <Component />
      </AuthenticatedRoute>
    }
  />
));

export default BusOperatorRoutes;
