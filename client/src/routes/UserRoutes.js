import React from 'react';
import { Route } from 'react-router-dom';
import NotFound from '../screens/NotFound';
import Booking from '../screens/user/booking/Booking';
import Home from '../screens/user/Home';
import Payment from '../screens/user/Payment';

const UserRoutes = [
  <Route path='*' element={<NotFound />} />,
  <Route path='/' element={<Home />} />,
  <Route path='/booking' element={<Booking />} />,
  <Route path='/payment' element={<Payment />} />,
];

export default UserRoutes;
