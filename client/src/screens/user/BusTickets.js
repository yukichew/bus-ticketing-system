import React from 'react';
import { IoFilter } from 'react-icons/io5';
import { TbArrowBigRightFilled } from 'react-icons/tb';
import BusCard from '../../components/user/BusCard';

const BusTickets = () => {
  const busSchedule = [
    {
      id: 1,
      name: 'Super Nice Express',
      type: 'Executive (2+1)',
      duration: '4h',
      departureTime: '10:15',
      departureLocation: 'JB Larkin',
      arrivalTime: '14:15',
      arrivalLocation: 'Penang Sentral',
      rating: 4.5,
      passengers: 27,
      price: 'RM 35.00',
    },
    {
      id: 2,
      name: 'Super Nice Express',
      type: 'Executive (2+1)',
      duration: '4h',
      departureTime: '10:15',
      departureLocation: 'JB Larkin',
      arrivalTime: '14:15',
      arrivalLocation: 'Penang Sentral',
      rating: 4.5,
      passengers: 27,
      price: 'RM 35.80',
    },
    {
      id: 3,
      name: 'Super Nice Express',
      type: 'Executive (2+1)',
      duration: '4h',
      departureTime: '10:15',
      departureLocation: 'JB Larkin',
      arrivalTime: '14:15',
      arrivalLocation: 'Penang Sentral',
      rating: 4.5,
      passengers: 27,
      price: 'RM 12.00',
    },
    {
      id: 4,
      name: 'Super Nice Express',
      type: 'Executive (2+1)',
      duration: '4h',
      departureTime: '10:15',
      departureLocation: 'JB Larkin',
      arrivalTime: '14:15',
      arrivalLocation: 'Penang Sentral',
      rating: 4.5,
      passengers: 27,
      price: 'RM 35.00',
    },
    {
      id: 5,
      name: 'Super Nice Express',
      type: 'Executive (2+1)',
      duration: '4h',
      departureTime: '10:15',
      departureLocation: 'JB Larkin',
      arrivalTime: '14:15',
      arrivalLocation: 'Penang Sentral',
      rating: 4.5,
      passengers: 27,
      price: 'RM 35.00',
    },
  ];

  return (
    <div className='py-5 font-poppins'>
      {/* search results header */}
      <div className='my-4 relative flex flex-col bg-white shadow-md border-t-4 border-t-primary rounded-lg w-11/12 lg:max-w-7xl mx-auto p-4'>
        <div className='flex flex-row mb-2 font-semibold text-grey-800 text-xl items-center'>
          <h5>Kuala Lumpur</h5>
          <TbArrowBigRightFilled className='mx-2' size={18} />
          <h5>Penang</h5>
        </div>
        <p className='text-gray-600 font-light text-sm'>2024-10-27</p>
      </div>

      {/* filter and search results count */}
      <div className='w-11/12 lg:max-w-7xl mx-auto my-4 pl-3 flex flex-row items-center'>
        <p className='text-gray-500'>
          <span className='font-semibold text-secondary'>237 buses </span>found
        </p>

        <button className='ml-auto flex items-center font-medium hover:text-primary pr-1'>
          <IoFilter size={16} />
          <p className='mx-1'>Filters</p>
        </button>
      </div>

      {/* search results */}
      <div className=''>
        {busSchedule.map((schedule) => (
          <BusCard key={schedule.id} schedule={schedule} />
        ))}
      </div>
    </div>
  );
};
export default BusTickets;
