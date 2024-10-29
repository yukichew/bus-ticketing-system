import React, { useState } from 'react';
import { FaBars, FaBusAlt, FaTimes } from 'react-icons/fa';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import LoginRegistrationModal from '../../screens/auth/LoginRegisterModal';
import Modal from '../common/Modal';
import NavbarItem from './NavbarItem';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentView, setCurrentView] = useState('login');

  const handleBackToLogin = () => setCurrentView('login');

  return (
    <nav className='bg-white shadow-lg'>
      <div className='mx-auto'>
        <div className='flex mx-auto justify-between w-5/6 items-center'>
          <div className='flex items-center gap-16 my-8'>
            {/* logo */}
            <Link
              to='/'
              className='flex gap-1 font-bold text-primary items-center'
            >
              <FaBusAlt className='h-6 w-6' />
              <span>RideNGo</span>
            </Link>

            {/* Desktop nav bar items */}
            <div className='hidden lg:flex items-center space-x-8'>
              <NavbarItem />
            </div>
          </div>

          <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
            <button
              onClick={() => setShowModal(true)}
              className='font-semibold text-secondary hover:text-primary transition duration-200'
            >
              Login <span aria-hidden='true'>&rarr;</span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className='lg:hidden'>
            <button
              onClick={() => setToggleMenu(!toggleMenu)}
              className='text-secondary hover:text-primary focus:outline-none'
            >
              {toggleMenu ? (
                <FaTimes className='h-6 w-6' />
              ) : (
                <FaBars className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>

        {toggleMenu && (
          <div className='lg:hidden bg-white shadow-lg absolute top-16 left-0 right-0'>
            <div className='flex flex-col items-center space-y-4 py-4'>
              <NavbarItem setToggleMenu={setToggleMenu} />
            </div>
          </div>
        )}
      </div>

      {/* modal for login and register */}
      <Modal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        backButton={
          currentView !== 'login' && (
            <IoArrowBackOutline
              size={25}
              className='cursor-pointer text-gray-400 hover:text-gray-800'
              onClick={handleBackToLogin}
              aria-label='Back'
            />
          )
        }
        className='w-2/6'
      >
        <LoginRegistrationModal
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      </Modal>
    </nav>
  );
};

export default Navbar;
