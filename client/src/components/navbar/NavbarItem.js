import React from 'react';
import { Link } from 'react-router-dom';

const NavbarItem = () => {
  const links = [
    { key: 1, name: 'Home', href: '/' },
    {
      key: 2,
      name: 'Bus Tickets',
      href: '/bus-tickets',
    },
    { key: 3, name: 'About', href: '/about' },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.key}
          to={link.href}
          aria-label={link.name}
          className='text-tertiary hover:text-primary transition duration-200 font-semibold'
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default NavbarItem;
