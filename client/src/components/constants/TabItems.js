import Notes from '../../screens/user/modal/Notes';
import Photos from '../../screens/user/modal/Photos';
import Ratings from '../../screens/user/modal/Ratings';

export const busInfoTabs = [
  { label: 'Notes', content: <Notes /> },
  { label: 'Photos', content: <Photos /> },
  {
    label: 'Ratings & Reviews',
    content: <Ratings />,
  },
];
