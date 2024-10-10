import React from 'react';
import { Link } from 'react-router-dom';

function NavbarItem() {
  const links = [
    { key: 1, name: 'Home', href: '/', 'aria-label': 'Home' },
    {
      key: 2,
      name: 'Bus Tickets',
      href: '/bus-tickets',
      'aria-label': 'Bus Tickets',
    },
    { key: 3, name: 'About', href: '/about', 'aria-label': 'About' },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.key}
          to={link.href}
          aria-label={link['aria-label']}
          className='text-gray-600 hover:text-primary hover:text-black transition duration-200'
        >
          {link.name}
        </Link>
      ))}
    </>
  );
}

export default NavbarItem;
