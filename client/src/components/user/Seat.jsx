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
      className={`relative flex items-center justify-center cursor-pointer
        ${isOccupied ? 'cursor-not-allowed text-gray-800' : ''} ${
        isSelected ? 'text-primary' : 'text-gray-400'
      }`}
      onClick={handleClick}
    >
      <ArmChair fill='currentColor' className={`w-11 h-11`} />
      <span className='font-poppins mb-3 absolute text-xs font-bold'>
        {seatNumber}
      </span>
    </div>
  );
};

export default Seat;
