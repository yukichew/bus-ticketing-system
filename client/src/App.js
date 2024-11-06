import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./screens/admin/AdminDashboard";
import ManageApplicationPage from "./screens/admin/ManageApplicationPage";
import ManageTransactionsPage from "./screens/admin/ManageTransactionsPage";
import FaqUserView from "./components/admin/FaqUserView";
import PolicyUserView from "./components/admin/PolicyUserView";
import ManageBusRoutes from "./screens/admin/ManageBusRoutes";
import ManageUserPage from "./screens/admin/ManageUserPage";
import ManageContents from "./screens/admin/ManageContents";
import ManageBus from "./screens/busOperator/busManagement/ManageBus";
import UserProfile from "./screens/busOperator/profile/UserProfile";
import NotFound from "./screens/NotFound";
import Booking from "./screens/user/booking/Booking";
import Home from "./screens/user/Home";
import Payment from "./screens/user/Payment";
import BODashboard from "./screens/busOperator/BODashboard";
import NewBusTypeForm from "./screens/busOperator/busManagement/NewBusTypeForm";
import EditBusTypeForm from "./screens/busOperator/busManagement/EditBusTypeForm";
import NewBusScheduleForm from "./screens/busOperator/busManagement/NewBusScheduleForm";
import EditBusScheduleForm from "./screens/busOperator/busManagement/EditBusScheduleForm";
import PassengerList from "./screens/busOperator/busManagement/PassengerList";
import BORatesAndReviews from "./screens/busOperator/BORatesAndReviews";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />

        {/* User */}
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />

        {/* Admin */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manage-user" element={<ManageUserPage />} />
        <Route
          path="/manage-applications"
          element={<ManageApplicationPage />}
        />
        <Route path="/manage-bus-routes" element={<ManageBusRoutes />} />
        <Route path="/manage-bus-routes" element={<ManageBusRoutes />} />
        <Route
          path="/manage-transactions"
          element={<ManageTransactionsPage />}
        />
        <Route path="/manage-contents" element={<ManageContents />} />
        <Route path="/faq" element={<FaqUserView />} />
        <Route path="/policies" element={<PolicyUserView />} />

        {/* Bus Operator */}
        <Route path="/bo/dashboard" element={<BODashboard />} />
        <Route path="/bo/user-profile" element={<UserProfile />} />
        <Route path="/bo/bus" element={<ManageBus />} />
        <Route path="/bo/bus/new-bus-type" element={<NewBusTypeForm />} />
        <Route path="/bo/bus/edit-bus-type" element={<EditBusTypeForm />} />
        {/* <Route path='/bo/bus/edit-bus-type/:bus_id' element={<EditBusTypeForm />} /> */}
        <Route
          path="/bo/bus/new-bus-schedule"
          element={<NewBusScheduleForm />}
        />
        <Route
          path="/bo/bus/edit-bus-schedule"
          element={<EditBusScheduleForm />}
        />
        {/* <Route path='/bo/bus/edit-bus-schedule/:bus_schedule_id' element={<EditBusScheduleForm />} /> */}
        <Route
          path="/bo/bus/bus-schedule/passenger-lists"
          element={<PassengerList />}
        />
        <Route path="/bo/rates-and-reviews" element={<BORatesAndReviews />} />

        {/* Bus Operator */}
        <Route path="/bo/user-profile" element={<UserProfile />} />
        <Route path="/bo/bus" element={<ManageBus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
