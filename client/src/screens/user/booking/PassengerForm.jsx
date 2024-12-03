import React, { useState } from "react";
import { BsTelephone } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { PiLineVerticalBold } from "react-icons/pi";
import CustomInput from "../../../components/common/CustomInput";

const PassengerForm = ({ passengerNumber, seatNumber, onChange }) => {
  const [details, setDetails] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      const updated = { ...prev, [name]: value };
      onChange(updated);
      return updated;
    });
  };

  return (
    <form className='space-y-2 bg-slate-50 border rounded-lg shadow-md p-3'>
      <div className='text-sm flex flex-row items-center pb-1'>
        <p className='font-semibold'>Passenger {passengerNumber}</p>
        <PiLineVerticalBold className='fill-primary mx-2' />
        <p className='font-medium text-gray-600'>Seat {seatNumber}</p>
      </div>

      <CustomInput
        id={`name`}
        name={`name`}
        placeholder={"Full Name"}
        type={"text"}
        icon={IoPersonOutline}
        required
        value={details.name}
        onChange={handleChange}
      />

      <div className='flex space-x-3'>
        <CustomInput
          id={`email-${seatNumber}`}
          name={`email`}
          placeholder={"Email"}
          type={"email"}
          icon={MdOutlineEmail}
          required
          value={details.email}
          onChange={handleChange}
        />
        <CustomInput
          id={`phoneNumber`}
          name={`phoneNumber`}
          placeholder={"Contact Number"}
          type={"tel"}
          icon={BsTelephone}
          required
          value={details.phoneNumber}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default PassengerForm;
