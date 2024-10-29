import React from 'react';
import Bullets from '../../../components/common/Bullets';
import { policies } from '../../../components/constants/Dummy';

const Notes = () => {
  return (
    <>
      {/* boarding and dropping points */}
      <div className='mb-5 pb-5 border-b-2'>
        <h2 className='text-lg font-semibold mb-3'>
          Boarding and Dropping Points
        </h2>
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
                Terminal Bersepadu Selatan (TBS) Main Counter A/B/CD/E/F/G/H,
                Bandar Tasik Selatan TBS link bridge, Bandar Tasek Selatan,
                57100 Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia
              </p>
            </div>

            {/* dropping point */}
            <div className='flex items-start space-x-2'>
              <p className='text-sm text-gray-700 leading-snug'>
                Batu Pahat Bus Terminal, Jalan Rugayah, Kampung Pegawai, 83000
                Batu Pahat, Johor, Malaysia.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* policies */}
      <Bullets contents={policies} />
    </>
  );
};

export default Notes;
