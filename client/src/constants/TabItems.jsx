import Carousel from "../components/common/Carousel";
import Notes from "../screens/user/modal/Notes";
import Ratings from "../screens/user/modal/Ratings";
import BusTypes from "../components/busOperator/BusTypes";
import BusScheduling from "../components/busOperator/BusScheduling";
import ManageBusOperator from "../components/admin/ManageBusOperators";
import ManageUser from "../components/admin/ManageUser";
import ManageTransactions from "../components/admin/ManageTransactions";
import ManageRefunds from "../components/admin/ManageRefunds";
import { bus } from "./Dummy";

export const busInfoTabs = [
  { label: "Notes", content: <Notes /> },
  { label: "Photos", content: <Carousel images={bus.images} /> },
  {
    label: "Ratings & Reviews",
    content: <Ratings />,
  },
];

export const busManagementTabs = [
  { label: "Bus Types", content: <BusTypes /> },
  { label: "Bus Scheduling", content: <BusScheduling /> },
];

export const manageUserTabs = [
  { label: "Passengers", content: <ManageUser /> },
  { label: "Bus Operators", content: <ManageBusOperator /> },
];

export const manageTransactionsTabs = [
  { label: "Transactions", content: <ManageTransactions /> },
  { label: "Refunds Request", content: <ManageRefunds /> },
];
