import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './screens/admin/AdminDashboard';
import ManageApplicationPage from './screens/admin/ManageApplicationPage';
import ManageBusRoutes from './screens/admin/ManageBusRoutes';
import ManageUserPage from './screens/admin/ManageUserPage';
import ManageBus from './screens/busOperator/busManagement/ManageBus';
import UserProfile from './screens/busOperator/profile/UserProfile';
import NotFound from './screens/NotFound';
import Booking from './screens/user/booking/Booking';
import Home from './screens/user/Home';
import Payment from './screens/user/Payment';
import BODashboard from './screens/busOperator/BODashboard';
import NewBusTypeForm from './screens/busOperator/busManagement/NewBusTypeForm';
import EditBusTypeForm from './screens/busOperator/busManagement/EditBusTypeForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />} />

        {/* User */}
        <Route path='/' element={<Home />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/payment' element={<Payment />} />

        {/* Admin */}
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/manage-user' element={<ManageUserPage />} />
        <Route
          path='/manage-applications'
          element={<ManageApplicationPage />}
        />
        <Route path='/manage-bus-routes' element={<ManageBusRoutes />} />

        {/* Bus Operator */}
        <Route path='/bo/dashboard' element={<BODashboard />} />
        <Route path='/bo/user-profile' element={<UserProfile />} />
        <Route path='/bo/bus' element={<ManageBus />} />
        <Route path='/bo/bus/new-bus-type' element={<NewBusTypeForm />} />
        <Route path='/bo/bus/edit-bus-type' element={<EditBusTypeForm />} />
        {/* <Route path='/bo/bus/edit-bus-type/:bus_id' element={<EditBusTypeForm />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
