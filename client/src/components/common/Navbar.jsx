import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo";
import { userLinks } from "../../constants/NavbarItems";
import LoginRegistrationModal from "../../screens/auth/LoginRegisterModal";
import Modal from "./Modal";
import { useAuth } from "../../utils/AuthContext";

const NavbarLinks = ({ isLoggedIn }) => {
  const links = userLinks.filter((link) => !link.isLoginRequired || isLoggedIn);
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.key}
          to={link.href}
          className='text-slate-600 hover:text-primary transition duration-200 font-medium'
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentView, setCurrentView] = useState("login");
  const { user } = useAuth();
  const isLoggedIn = user !== null;

  useEffect(() => {
    setShowModal(false);
  }, [user]);

  return (
    <nav className='w-full px-6 md:px-5 py-7 bg-white shadow-lg'>
      <div className='container flex items-center justify-between mx-auto text-slate-800 max-w-screen-xl'>
        {/* logo */}
        <Logo />

        {/* desktop links */}
        <div className='hidden lg:flex gap-6 items-center'>
          <NavbarLinks isLoggedIn={isLoggedIn} />
        </div>

        {/* desktop login button */}
        <div className='hidden lg:flex'>
          <button
            onClick={() => setShowModal(true)}
            className='text-secondary font-semibold hover:text-primary transition duration-200 underline-offset-2'
          >
            Login
          </button>
        </div>

        {/* mobile view */}
        <button
          className='lg:hidden text-primary z-20 relative'
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          {toggleMenu ? (
            <FaTimes className='h-6 w-6' />
          ) : (
            <FaBars className='h-6 w-6' />
          )}
        </button>
      </div>

      {/* mobile menu */}
      {toggleMenu && (
        <div className='lg:hidden fixed inset-0 bg-white shadow-lg z-10 flex justify-center items-center'>
          <div className='flex flex-col items-center space-y-4'>
            <NavbarLinks isLoggedIn={isLoggedIn} />
            {!isLoggedIn && (
              <button
                onClick={() => {
                  setShowModal(true);
                  setToggleMenu(false);
                }}
                className='text-secondary font-semibold hover:text-primary hover:underline transition duration-200'
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}

      {/* login modal */}
      <Modal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        backButton={
          currentView !== "login" && (
            <IoArrowBackOutline
              size={25}
              className='cursor-pointer text-gray-400 hover:text-gray-800'
              onClick={() => setCurrentView("login")}
              aria-label='Back'
            />
          )
        }
        className='w-full sm:w-4/6 lg:w-2/6'
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
