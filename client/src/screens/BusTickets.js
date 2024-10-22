import React from 'react';
import BusCard from '../components/user/BusCard';

const BusTickets = () => {
  const busSchedule = {
    id: 1,
    name: 'Super Nice Express',
    type: 'Executive (2+1)',
    duration: '4h',
    departureTime: '10:15',
    departureLocation: 'JB Larkin',
    arrivalTime: '14:15',
    arrivalLocation: 'Penang Sentral Bus Terminal',
    rating: 4.5,
    passengers: 27,
    price: 'RM 35',
  };

  return (
    <div className='p-5'>
      <BusCard schedule={busSchedule} />
    </div>
  );
};

export default BusTickets;
