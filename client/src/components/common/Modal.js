import React from 'react';
import { IoClose } from 'react-icons/io5';

const Modal = ({ isVisible, onClose, children, className }) => {
  if (!isVisible) return null;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-55 flex justify-center items-center'>
      <div className={`bg-white rounded-lg shadow-lg p-6 w-auto' ${className}`}>
        <IoClose
          size={25}
          className='cursor-pointer float-right text-gray-400 hover:text-gray-800'
          onClick={onClose}
          aria-label='Close'
        />
        {children}
      </div>
    </div>
  );
};
export default Modal;
