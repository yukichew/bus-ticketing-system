import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo";
import { busOperatorLinks, userLinks } from "../../constants/NavbarItems";
import { useAuth } from "../../utils/AuthContext";

const NavbarLinks = ({ role }) => {
  const links =
    role === "BusOperator"
      ? busOperatorLinks
      : userLinks.filter(
          (link) =>
            !link.isLoginRequired || (link.isLoginRequired && role === "Member")
        );

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
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { auth } = useAuth();

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <nav className='w-full px-6 md:px-5 py-7 bg-white shadow-lg'>
      <div className='container flex items-center justify-between mx-auto text-slate-800 max-w-screen-xl'>
        {/* logo */}
        <Logo />

        {/* desktop links */}
        <div className='hidden lg:flex gap-6 items-center'>
          <NavbarLinks role={auth?.role} />
        </div>

        {/* desktop user or login button */}
        <div className='hidden lg:flex'>
          {auth ? (
            <div className='relative'>
              <button
                onClick={() => setDropdownVisible(!dropdownVisible)}
                className='text-slate-600 hover:text-primary transition duration-200 font-medium'
              >
                {auth.user.userName}
              </button>

              {dropdownVisible && (
                <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2'>
                  <Link
                    to='/edit-profile'
                    className='block px-4 py-2 text-slate-600 hover:text-primary'
                  >
                    Edit Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='block w-full text-left px-4 py-2 text-slate-600 hover:text-primary'
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={navigateToLogin}
              className='text-secondary font-semibold hover:text-primary transition duration-200 underline-offset-2'
            >
              Login
            </button>
          )}
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
            <NavbarLinks role={auth?.role} />
            {!auth && (
              <button
                onClick={navigateToLogin}
                className='text-secondary font-semibold hover:text-primary hover:underline transition duration-200'
              >
                Login
              </button>
            )}
            {auth && (
              <div>
                <button
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                  className='text-slate-600 hover:text-primary'
                >
                  {auth.user.userName}
                </button>

                {dropdownVisible && (
                  <div className='flex flex-col items-center mt-4'>
                    <Link
                      to='/edit-profile'
                      className='text-slate-600 hover:text-primary'
                    >
                      Edit Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='text-slate-600 hover:text-primary'
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
