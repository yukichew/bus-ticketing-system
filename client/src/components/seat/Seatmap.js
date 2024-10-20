import React, { useState } from 'react';
import { RiSteering2Line } from 'react-icons/ri';
import CustomButton from '../common/CustomButton';
import Seat from './Seat';

const Seatmap = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const seats = Array.from({ length: 40 }, (_, i) => i + 1);

  const handleSelect = (seatNumber) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter((seat) => seat !== seatNumber)
        : [...prevSelectedSeats, seatNumber]
    );
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <CustomButton title='Select Seat' type='button' onClick={toggleModal} />

      {showModal && (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-55 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg w-auto'>
            <h2 className='text-xl font-semibold mb-4 font-poppins'>
              Select your seat
            </h2>

            <div className='flex justify-end items-center mb-4 bg-gray-100 p-2'>
              <RiSteering2Line size={25} className='mr-4' />
            </div>

            <div
              className='grid grid-cols-custom mb-4'
              style={{
                gridTemplateColumns: '1fr 2fr 1fr 1fr',
                columnGap: '10px',
              }}
            >
              {seats.map((seatNumber) => (
                <div className='flex' key={seatNumber}>
                  <Seat
                    key={seatNumber}
                    seatNumber={seatNumber}
                    isSelected={selectedSeats.includes(seatNumber)}
                    isOccupied={false}
                    onSelect={handleSelect}
                  />
                </div>
              ))}
            </div>

            <div className='flex justify-between'>
              <button
                onClick={toggleModal}
                className='px-4 py-2 bg-gray-400 text-white rounded'
              >
                Close
              </button>
              <button
                onClick={() => {
                  toggleModal();
                }}
                className='px-4 py-2 bg-blue-500 text-white rounded'
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Seatmap;
