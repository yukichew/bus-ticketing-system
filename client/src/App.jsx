import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminRoutes from './routes/AdminRoutes';
import BusOperatorRoutes from './routes/BusOperatorRoutes';
import UserRoutes from './routes/UserRoutes';
import AuthRoutes from './routes/AuthRoutes';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MemberRoutes from './routes/MemberRoutes';

const stripePromise = loadStripe(
  'pk_test_51Pjg7s08WeyfGZMBKCnDiE2nlWFgN0vq2vM2rfYCaKkkhhBRdpa3uFkxdTcP4CCiJG9lrdSSOIELTdxlTkhYPqaK00rr2N0yXu'
);

function App() {
  useEffect(() => {
    document.title = 'RideNGo';
  }, []);

  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={2000}
      />
      <BrowserRouter>
        <Routes>
          {AuthRoutes}
          {MemberRoutes}
          {UserRoutes.map((route, index) => {
            if (route.props.path === '/payment') {
              return (
                <Route
                  key={index}
                  path={route.props.path}
                  element={
                    <Elements stripe={stripePromise}>
                      {route.props.element}
                    </Elements>
                  }
                />
              );
            }
            return route;
          })}
          {BusOperatorRoutes}
          {AdminRoutes}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
