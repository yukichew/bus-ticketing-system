import React from 'react';
import { ReactComponent as ArmChair } from '../../assets/armchair.svg';

const Seat = ({ seatNumber, isSelected, isOccupied, onSelect }) => {
  const handleClick = () => {
    if (!isOccupied) {
      onSelect(seatNumber);
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center
        ${isOccupied ? 'cursor-not-allowed text-gray-800' : 'cursor-pointer'} ${
        isSelected ? 'text-primary' : 'text-gray-400'
      }`}
      onClick={handleClick}
    >
      <ArmChair
        fill='currentColor'
        className={`w-10 h-10`}
      />
      <span className='font-poppins mb-3 absolute text-xs font-bold'>
        {seatNumber}
      </span>
    </div>
  );
};

export default Seat;
