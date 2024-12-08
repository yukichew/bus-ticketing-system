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

const BusOperatorRoutes = [
  <Route path='/bo/dashboard' element={<BODashboard />} />,
  <Route path='/bo/user-profile' element={<UserProfile />} />,
  <Route path='/bo/bus' element={<ManageBus />} />,
  <Route path='/bo/bus/new-bus' element={<NewBusForm />} />,
  <Route path='/bo/bus/edit-bus/:busID' element={<EditBusForm />} />,
  <Route path='/bo/bus/new-bus-type' element={<NewBusTypeForm />} />,
  <Route path='/bo/bus/edit-bus-type/:busTypeID' element={<EditBusTypeForm />} />,
  <Route path='/bo/bus/new-bus-schedule' element={<NewBusScheduleForm />} />,
  <Route path='/bo/bus/edit-bus-schedule/:busScheduleID' element={<EditBusScheduleForm />} />,
  <Route
    path='/bo/bus/bus-schedule/passenger-lists'
    element={<PassengerList />}
  />,
  <Route path='/bo/rates-and-reviews' element={<BORatesAndReviews />} />,
  <Route path='/bo/user-profile' element={<UserProfile />} />,
  <Route path='/bo/bus' element={<ManageBus />} />,
];

export default BusOperatorRoutes;
