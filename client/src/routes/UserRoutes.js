import React from 'react';
import { Route } from 'react-router-dom';
import NotFound from '../screens/NotFound';
import Booking from '../screens/user/booking/Booking';
import Home from '../screens/user/Home';
import ContactUs from '../screens/user/ContactUs';
import Payment from '../screens/user/Payment';
import BusTickets from '../screens/user/BusTickets';
import FaqUserView from '../components/admin/FaqUserView';
import PolicyUserView from '../components/admin/PolicyUserView';
import PaymentSuccess from '../screens/user/PaymentSuccess';

const UserRoutes = [
  <Route
    path='*'
    element={<NotFound />}
  />,
  <Route
    path='/'
    element={<Home />}
  />,
  <Route
    path='/home'
    element={<Home />}
  />,
  <Route
    path='/booking'
    element={<Booking />}
  />,
  <Route
    path='/payment'
    element={<Payment />}
  />,
  <Route
    path='/payment-success'
    element={<PaymentSuccess />}
  />,
  <Route
    path='/bus-tickets'
    element={<BusTickets />}
  />,
  <Route
    path='/faq'
    element={<FaqUserView />}
  />,
  <Route
    path='/policies'
    element={<PolicyUserView />}
  />,
  <Route
    path='/contact-us'
    element={<ContactUs />}
  />,
];

export default UserRoutes;
