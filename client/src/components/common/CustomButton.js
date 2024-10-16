import React from 'react';

const CustomButton = ({ title }) => {
  return (
    <button
      type='submit'
      className='bg-primary items-center justify-center w-full h-12 px-6 font-medium font-poppins tracking-wide text-white transition duration-200 rounded shadow-md focus:outline-none'
    >
      {title}
    </button>
  );
};

export default CustomButton;
