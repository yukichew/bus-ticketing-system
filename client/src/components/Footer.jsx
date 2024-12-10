import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className='bg-slate-100'>
      <div className='mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <Logo />

          <div className='justify-start md:justify-end flex text-gray-600 text-sm'>
            <Link
              to='/contact-us'
              className='transition hover:opacity-70'
            >
              Contact Us
            </Link>

            <Link
              to='/faq'
              className='ml-8 transition hover:opacity-70'
            >
              FAQs
            </Link>

            <Link
              to='/policies'
              className='ml-8 transition hover:opacity-70'
            >
              Terms & Conditions
            </Link>
          </div>
        </div>

        <div className='mt-3 border-t border-gray-300'>
          <div className='sm:flex sm:justify-between mt-3'>
            <p className='text-xs text-gray-500 items-center flex'>
              &copy; 2024. RideNGo. All rights reserved.
            </p>

            <ul className='flex flex-wrap mt-3 gap-3 sm:mt-0 sm:justify-end'>
              <li>
                <a
                  href='https://www.instagram.com/asiapacificuniversity/?hl=en'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <FaInstagram
                    size={20}
                    className='text-gray-700 pointer-events-none transition hover:opacity-75'
                  />
                </a>
              </li>
              <li>
                <a
                  href='https://my.linkedin.com/school/apumalaysia/'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <FaLinkedin
                    size={20}
                    className='text-gray-700 pointer-events-none transition hover:opacity-75'
                  />
                </a>
              </li>
              <li>
                <a
                  href='https://www.facebook.com/apuniversity/'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <FaFacebook
                    size={20}
                    className='text-gray-700 pointer-events-none transition hover:opacity-75'
                  />
                </a>
              </li>
              <li>
                <a
                  href='https://www.facebook.com/apuniversity/'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <FaXTwitter
                    size={20}
                    className='text-gray-700 pointer-events-none transition hover:opacity-75'
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
