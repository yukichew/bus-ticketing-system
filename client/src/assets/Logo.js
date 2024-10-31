import React from 'react';
import { FaBusAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to='/' className='flex items-center gap-1 text-primary font-bold'>
      <FaBusAlt className='h-6 w-6' />
      <span>RideNGo</span>
    </Link>
  );
};

export default Logo;
