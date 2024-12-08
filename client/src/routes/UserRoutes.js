import React from "react";
import { Route } from "react-router-dom";
import NotFound from "../screens/NotFound";
import Booking from "../screens/user/booking/Booking";
import Home from "../screens/user/Home";
import Payment from "../screens/user/Payment";
import BusTickets from "../screens/user/BusTickets";
import Trips from "../screens/user/Trips";
import AuthenticatedRoute from "./AuthenticatedRoute";

const UserRoutes = [
  <Route path='*' element={<NotFound />} />,
  <Route path='/' element={<Home />} />,
  <Route path='/booking' element={<Booking />} />,
  <Route path='/payment' element={<Payment />} />,
  <Route path='/bus-tickets' element={<BusTickets />} />,
  <Route
    path='/trips'
    element={
      <AuthenticatedRoute requiredRole='Member'>
        <Trips />
      </AuthenticatedRoute>
    }
  />,
];

export default UserRoutes;
