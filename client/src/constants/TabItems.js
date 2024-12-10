import Carousel from "../components/common/Carousel";
import Notes from "../screens/user/modal/Notes";
import Ratings from "../screens/user/modal/Ratings";
import BusInfo from "../components/busOperator/BusInfo";
import BusType from "../components/busOperator/BusType";
import BusScheduling from "../components/busOperator/BusScheduling";
import ManageBusOperator from "../components/admin/ManageBusOperators";
import ManageUser from "../components/admin/ManageUser";
import ManagePolicy from "../components/admin/ManagePolicy";
import ManageFaq from "../components/admin/ManageFaq";

export const busInfoTabs = [
  { label: "Notes", content: <Notes /> },
  {
    label: "Photos",
    content: (props) => <Carousel images={props.schedule.postedBy.busImages} />,
  },
  {
    label: "Ratings & Reviews",
    content: (props) => <Ratings id={props.schedule.postedBy.id} />,
  },
];

export const busManagementTabs = [
  { label: "All", content: <BusInfo /> },
  { label: "Bus Type", content: <BusType /> },
  { label: "Bus Scheduling", content: <BusScheduling /> },
];

export const manageUserTabs = [
  { label: "Users", content: <ManageUser /> },
  { label: "Bus Operators", content: <ManageBusOperator /> },
];

export const manageContentTabs = [
  { label: "FAQs", content: <ManageFaq /> },
  { label: "Terms and Conditions", content: <ManagePolicy /> },
];
