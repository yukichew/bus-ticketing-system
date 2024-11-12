import React from 'react';
import { PiCircleFill } from 'react-icons/pi';

const Bullet = ({ content }) => {
  return (
    <div className='flex items-center space-x-2'>
      <PiCircleFill size={15} className='fill-primary' />
      <p className='text-sm text-gray-700'>{content}</p>
    </div>
  );
};

const Bullets = ({ contents }) => {
  return (
    <div className='space-y-2'>
      {contents.map((content, index) => (
        <Bullet key={index} content={content} />
      ))}
    </div>
  );
};

export default Bullets;
