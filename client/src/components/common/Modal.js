import React from 'react';

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
      <div className='bg-white rounded-lg shadow-2xl p-7 sm:p-10 relative z-10 max-w-lg w-full'>
        <div className="flex justify-between items-center mb-4">
          <button
            className='text-gray-600 hover:text-gray-900'
          >
            Back
          </button>
          <button
            className='text-gray-600 hover:text-gray-900'
            onClick={closeModal}
            style={{ fontSize: '2.1rem' }}
          >
            &times;
          </button>
        </div>
        <div className='mt-6'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;