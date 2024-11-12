import Carousel from '../components/common/Carousel';
import Notes from '../screens/user/modal/Notes';
import Ratings from '../screens/user/modal/Ratings';
import BusTypes from '../components/busOperator/BusTypes';
import BusScheduling from '../components/busOperator/BusScheduling';
import { bus } from './Dummy';

export const busInfoTabs = [
  { label: 'Notes', content: <Notes /> },
  { label: 'Photos', content: <Carousel images={bus.images} /> },
  {
    label: 'Ratings & Reviews',
    content: <Ratings />,
  },
];

export const busManagementTabs = [
  { label: 'Bus Types', content: <BusTypes /> },
  { label: 'Bus Scheduling', content: <BusScheduling /> },
];
