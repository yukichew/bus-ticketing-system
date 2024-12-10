import React, { useEffect, useState } from 'react';
import { RiSteering2Line } from 'react-icons/ri';
import Seat from './Seat';
import { getOccupiedSeats } from '../../api/booking';

const Seatmap = ({ schedule, layout, selectedSeats, handleSelect }) => {
  const noOfSeats = schedule.busInfo.busType.noOfSeats;
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const seats = Array.from({ length: noOfSeats }, (_, i) => i + 1);

  const getGridTemplateColumns = () => {
    switch (layout) {
      case '2+1':
        return '1.5fr 1fr 1fr';
      case 'Executive':
        return '1fr 2fr 1fr 1fr';
      default:
        return '1fr 2fr 1fr 1fr';
    }
  };

  useEffect(() => {
    const fetchOccupiedSeats = async () => {
      const data = await getOccupiedSeats(schedule.busScheduleID);
      if (data.error) return;
      setOccupiedSeats(data);
    };
    fetchOccupiedSeats();
  }, [schedule.busScheduleId]);

  return (
    <>
      <div className='flex justify-end items-center my-3 bg-gray-200 p-2 rounded'>
        <RiSteering2Line
          size={25}
          className='mr-4 text-gray-500'
        />
      </div>

      <div
        className='grid'
        style={{ gridTemplateColumns: getGridTemplateColumns(), gap: '4px' }}
      >
        {seats.map((seatNumber) => (
          <div
            className='flex'
            key={seatNumber}
          >
            <Seat
              key={seatNumber}
              seatNumber={seatNumber}
              isSelected={selectedSeats.includes(seatNumber)}
              isOccupied={occupiedSeats.includes(seatNumber)}
              onSelect={handleSelect}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Seatmap;
