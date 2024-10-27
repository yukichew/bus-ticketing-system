import React from 'react';

const Modal = ({ isOpen, closeModal, showBackButton, backButtonAction, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
      <div className='bg-white rounded-lg shadow-2xl p-7 sm:p-10 relative z-10 w-full max-w-lg'>
        <div className='flex items-center justify-between'>
          {showBackButton && (
            <button
              className='absolute top-5 left-9 text-gray-600 hover:text-gray-900'
              onClick={backButtonAction}
              style={{ fontSize: '1.5rem' }}
            >
              &#8592;
            </button>
          )}
          <button
            className='absolute top-2 right-9 text-gray-600 hover:text-gray-900 mb-1'
            onClick={closeModal}
            style={{ fontSize: '2.2rem' }}
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