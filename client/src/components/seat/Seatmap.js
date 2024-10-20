import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
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
          <div className='bg-white p-7 rounded-lg w-auto relative'>
            <IoClose
              size={25}
              className='cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-gray-800'
              onClick={toggleModal}
            />
            <h2 className='text-lg lg:text-xl font-semibold font-poppins'>
              Select your seat
            </h2>

            <div className='flex justify-end items-center my-3 bg-gray-200 p-2 rounded'>
              <RiSteering2Line size={25} className='mr-4 text-gray-500' />
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

            <CustomButton
              title='Proceed to Book'
              type='button'
              onClick={() => {
                toggleModal();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Seatmap;
