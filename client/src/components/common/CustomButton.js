import React from 'react';

const CustomButton = ({ title, type, onClick, className }) => {
  return (
    <button
      type={type}
      className={`bg-primary items-center justify-center w-full h-12 px-6 font-medium font-poppins tracking-wide text-white transition duration-200 rounded-lg shadow-md hover:bg-secondary ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
