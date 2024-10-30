import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import AdminDashboard from "./screens/admin/AdminDashboard";
import ManageUserPage from "./screens/admin/ManageUserPage";
import ManageApplicationPage from "./screens/admin/ManageApplicationPage";
import ManageBusRoutes from "./screens/admin/ManageBusRoutes";
import UserProfile from "./screens/busOperator/profile/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manage-user" element={<ManageUserPage />} />
        <Route
          path="/manage-applications"
          element={<ManageApplicationPage />}
        />
        <Route path="/manage-bus-routes" element={<ManageBusRoutes />} />
        {/* Bus Operator */}
        <Route path="/bo/user-profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
