import React from 'react';

const Loader = () => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-white/80'>
      <div
        className='inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent'
        role='status'
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
