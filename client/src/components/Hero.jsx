import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import BusTicketForm from './user/BusTicketForm';

const Hero = () => {
  const [formState, setFormState] = useState({
    originState: '',
    destinationState: '',
    travelDate: null,
    returnDate: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('busSearch');
    localStorage.removeItem('isRoundTrip');
    localStorage.removeItem('onwardSelectedSeats');
    localStorage.removeItem('returnSelectedSeats');
    localStorage.removeItem('selectedSchedule');
    localStorage.removeItem('selectedReturnSchedule');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      originState: formState.originState,
      destinationState: formState.destinationState,
      travelDate: formState.travelDate,
    }).toString();
    localStorage.setItem('busSearch', JSON.stringify(formState));
    localStorage.setItem(
      'isRoundTrip',
      formState.returnDate ? 'true' : 'false'
    );
    navigate(`/bus-tickets?${queryParams}`);
  };

  return (
    <section className='relative h-screen flex items-center justify-center'>
      <img
        src='https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        className='absolute inset-0 object-cover w-full h-full'
        alt='Bus'
      />
      <div className='relative bg-gray-900 bg-opacity-65 w-full h-full flex items-center justify-center'>
        <div className='px-4 py-10 md:py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl 2xl:w-full md:px-20 lg:px-8'>
          <div className='flex flex-col items-center justify-between lg:flex-row'>
            <div className='w-full max-w-xl mb-12 lg:mb-0 lg:pr-16 lg:w-1/2 2xl:w-2/5'>
              <h2 className='font-poppins max-w-lg mb-4 text-3xl font-bold text-white sm:text-4xl sm:leading-tight'>
                Book Your Bus Tickets on RideNGo
              </h2>
              <p className='font-poppins max-w-xl mb-4 text-base text-gray-400 md:text-lg'>
                RideNGo stands as Malaysia's leading online platform for bus
                ticketing, earning the trust of millions of global travellers.
              </p>
            </div>

            <div className='w-full max-w-xl lg:pl-6 lg:w-1/2 2xl:w-3/5'>
              <div className='bg-white rounded p-10'>
                <h3 className='font-poppins mb-5 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl'>
                  Buy Bus Tickets Online
                </h3>
                <BusTicketForm
                  formState={formState}
                  setFormState={setFormState}
                  onSubmit={handleSearch}
                  customButtonClassName='pt-1'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
