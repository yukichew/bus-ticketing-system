import React from 'react';
import { Route } from 'react-router-dom';
import BODashboard from '../screens/busOperator/BODashboard';
import BORatesAndReviews from '../screens/busOperator/BORatesAndReviews';
import EditBusScheduleForm from '../screens/busOperator/busManagement/EditBusScheduleForm';
import EditBusTypeForm from '../screens/busOperator/busManagement/EditBusTypeForm';
import ManageBus from '../screens/busOperator/busManagement/ManageBus';
import NewBusScheduleForm from '../screens/busOperator/busManagement/NewBusScheduleForm';
import NewBusTypeForm from '../screens/busOperator/busManagement/NewBusTypeForm';
import PassengerList from '../screens/busOperator/busManagement/PassengerList';
import UserProfile from '../screens/busOperator/profile/UserProfile';

const BusOperatorRoutes = [
  <Route path='/bo/dashboard' element={<BODashboard />} />,
  <Route path='/bo/user-profile' element={<UserProfile />} />,
  <Route path='/bo/bus' element={<ManageBus />} />,
  <Route path='/bo/bus/new-bus-type' element={<NewBusTypeForm />} />,
  <Route path='/bo/bus/edit-bus-type' element={<EditBusTypeForm />} />,
  // <Route path='/bo/bus/edit-bus-type/:bus_id' element={<EditBusTypeForm />} />
  <Route path='/bo/bus/new-bus-schedule' element={<NewBusScheduleForm />} />,
  <Route path='/bo/bus/edit-bus-schedule' element={<EditBusScheduleForm />} />,
  // <Route path='/bo/bus/edit-bus-schedule/:bus_schedule_id' element={<EditBusScheduleForm />} />
  <Route
    path='/bo/bus/bus-schedule/passenger-lists'
    element={<PassengerList />}
  />,
  <Route path='/bo/rates-and-reviews' element={<BORatesAndReviews />} />,
  <Route path='/bo/user-profile' element={<UserProfile />} />,
  <Route path='/bo/bus' element={<ManageBus />} />,
];

export default BusOperatorRoutes;
