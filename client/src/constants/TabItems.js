import Carousel from '../components/common/Carousel';
import Notes from '../screens/user/modal/Notes';
import Ratings from '../screens/user/modal/Ratings';
import { bus } from './Dummy';

export const busInfoTabs = [
  { label: 'Notes', content: <Notes /> },
  { label: 'Photos', content: <Carousel images={bus.images} /> },
  {
    label: 'Ratings & Reviews',
    content: <Ratings />,
  },
];
