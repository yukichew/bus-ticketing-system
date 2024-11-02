import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./screens/admin/AdminDashboard";
import ManageApplicationPage from "./screens/admin/ManageApplicationPage";
import ManageBusRoutes from "./screens/admin/ManageBusRoutes";
import ManageUserPage from "./screens/admin/ManageUserPage";
import ManageTransactionsPage from "./screens/admin/ManageTransactionsPage";
import Home from "./screens/user/Home";
import UserProfile from "./screens/busOperator/profile/UserProfile";
import ManageBus from "./screens/busOperator/busManagement/ManageBus";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User */}
        <Route path="/" element={<Home />} />

        {/* Admin */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manage-user" element={<ManageUserPage />} />
        <Route
          path="/manage-applications"
          element={<ManageApplicationPage />}
        />
        <Route path="/manage-bus-routes" element={<ManageBusRoutes />} />
        <Route
          path="/manage-transactions"
          element={<ManageTransactionsPage />}
        />

        {/* Bus Operator */}
        <Route path="/bo/user-profile" element={<UserProfile />} />
        <Route path="/bo/bus" element={<ManageBus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
