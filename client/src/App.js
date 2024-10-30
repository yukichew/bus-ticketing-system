import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import OTPVerification from "./screens/OTPVerification";
import SignUp from "./screens/SignUp";
import ResetPassword from "./screens//ResetPassword";
import AdminDashboard from "./screens/admin/AdminDashboard";
import ManageUserPage from "./screens/admin/ManageUserPage";
import ManageApplicationPage from "./screens/admin/ManageApplicationPage";
import ManageBusRoutes from "./screens/admin/ManageBusRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/create-account" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manage-user" element={<ManageUserPage />} />
        <Route
          path="/manage-applications"
          element={<ManageApplicationPage />}
        />
        <Route path="/manage-bus-routes" element={<ManageBusRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
