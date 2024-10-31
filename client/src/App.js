import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './screens/admin/AdminDashboard';
import ManageApplicationPage from './screens/admin/ManageApplicationPage';
import ManageBusRoutes from './screens/admin/ManageBusRoutes';
import ManageUserPage from './screens/admin/ManageUserPage';
import ManageBus from './screens/busOperator/busManagement/ManageBus';
import UserProfile from './screens/busOperator/profile/UserProfile';
import NotFound from './screens/NotFound';
import Home from './screens/user/Home';
import BODashboard from './screens/busOperator/dashboard/BODashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />} />

        {/* User */}
        <Route path='/' element={<Home />} />

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
