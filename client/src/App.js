import React, { useEffect } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import AdminRoutes from './routes/AdminRoutes';
import BusOperatorRoutes from './routes/BusOperatorRoutes';
import UserRoutes from './routes/UserRoutes';

function App() {
  useEffect(() => {
    document.title = "RideNGo";
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {UserRoutes}
        {BusOperatorRoutes}
        {AdminRoutes}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
