import React from 'react';

const TripSummary = () => {
  return (
    <div className='flex flex-row items-center space-x-4'>
      {/* time */}
      <div className='flex flex-col items-center text-center'>
        <p className='font-semibold text-gray-700 mt-1'>00:30</p>
        <div className='w-px bg-gray-400 my-1 h-12'></div>
        <p className='font-semibold text-gray-700'>05:42</p>
      </div>

      {/* location */}
      <div className='space-y-4'>
        {/* boarding point */}
        <div className='sspace-x-2'>
          <p className='text-sm text-gray-700 leading-snug'>
            Terminal Bersepadu Selatan (TBS) Main Counter A/B/CD/E/F/G/H, Bandar
            Tasik Selatan TBS link bridge, Bandar Tasek Selatan, 57100 Kuala
            Lumpur, Federal Territory of Kuala Lumpur, Malaysia
          </p>
        </div>

        {/* dropping point */}
        <div className='flex items-start space-x-2'>
          <p className='text-sm text-gray-700 leading-snug'>
            Batu Pahat Bus Terminal, Jalan Rugayah, Kampung Pegawai, 83000 Batu
            Pahat, Johor, Malaysia.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TripSummary;
