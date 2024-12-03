import React, { useState } from "react";
import { RiSteering2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import CustomButton from "../common/CustomButton";
import Modal from "../common/Modal";
import Seat from "./Seat";

const Seatmap = ({ noOfSeats, layout }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const seats = Array.from({ length: noOfSeats }, (_, i) => i + 1);
  const navigate = useNavigate();

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

  const getGridTemplateColumns = () => {
    switch (layout) {
      case "2+1":
        return "1.5fr 1fr 1fr";
      case "Executive":
        return "1fr 2fr 1fr 1fr";
      default:
        return "1fr 2fr 1fr 1fr";
    }
  };

  return (
    <>
      <CustomButton
        title='SELECT'
        className='font-semibold'
        type='button'
        onClick={toggleModal}
      />

      <Modal isVisible={showModal} onClose={toggleModal} className='w-auto'>
        <h2 className='text-lg lg:text-xl font-semibold font-poppins'>
          Select your seat
        </h2>

        <div className='flex justify-end items-center my-3 bg-gray-200 p-2 rounded'>
          <RiSteering2Line size={25} className='mr-4 text-gray-500' />
        </div>

        <div
          className='grid'
          style={{ gridTemplateColumns: getGridTemplateColumns(), gap: "4px" }}
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
            navigate("/booking", { state: { selectedSeats } });
          }}
          className='mt-2'
        />
      </Modal>
    </>
  );
};

export default Seatmap;
