import React from 'react';

const CustomButton = ({ title, onClick }) => {
  return (
    <button
      type='submit'
      onClick={onClick}
      className='bg-primary items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md focus:outline-none'
    >
      {title}
    </button>
  );
};

export default CustomButton;
