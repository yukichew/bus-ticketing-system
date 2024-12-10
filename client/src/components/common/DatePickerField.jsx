import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoCalendarOutline } from 'react-icons/io5';

const DatePickerField = ({
  selectedDate,
  setSelectedDate,
  placeholder,
  required,
  id,
  name,
  className = "",
  datePickerClassName  = "",
}) => {
  return (
    <div className={`w-full relative flex items-center rounded ring-1 ring-gray-300 font-poppins text-sm bg-white ${className}`}>
      <IoCalendarOutline
        size={20}
        className='text-gray-400 pointer-events-none ml-3'
      />
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        placeholderText={placeholder}
        className={`w-full h-12 px-4 focus:outline-none bg-white text-gray-700 ${datePickerClassName}`}
        id={id}
        name={name}
        required={required}
      />
    </div>
  );
};

export default DatePickerField;
