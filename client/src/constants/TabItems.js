import Carousel from "../components/common/Carousel";
import Notes from "../screens/user/modal/Notes";
import Ratings from "../screens/user/modal/Ratings";
import BusInfo from "../components/busOperator/BusInfo";
import BusType from "../components/busOperator/BusType";
import BusScheduling from "../components/busOperator/BusScheduling";
import ManageBusOperator from "../components/admin/ManageBusOperators";
import ManageUser from "../components/admin/ManageUser";
import ManageTransactions from "../components/admin/ManageTransactions";
import ManageRefunds from "../components/admin/ManageRefunds";
import ManagePolicy from "../components/admin/ManagePolicy";
import ManageFaq from "../components/admin/ManageFaq";
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
  { label: "All", content: <BusInfo /> },
  { label: "Bus Type", content: <BusType /> },
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

export const manageContentTabs = [
  { label: "FAQs", content: <ManageFaq /> },
  { label: "Terms and Conditions", content: <ManagePolicy /> },
];
