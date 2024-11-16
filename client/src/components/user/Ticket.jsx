import html2pdf from 'html2pdf.jsx';
import React, { useRef } from 'react';
import Logo from '../../assets/Logo';
import CustomButton from '../common/CustomButton';

const Ticket = ({ booking }) => {
  const ticketRef = useRef();

  const generatePDF = ({ bookingID }) => {
    html2pdf().from(ticketRef.current).save(`ticket-${bookingID}.pdf`);
  };

  const content = ({ title, desc }) => {
    return (
      <div className='font-medium'>
        <p className='text-xs md:text-sm text-gray-400'>{title}</p>
        <p className='text-sm md:text-base text-gray-800'>{desc}</p>
      </div>
    );
  };

  return (
    <>
      <div ref={ticketRef} className='p-6 rounded-lg border font-poppins m-4'>
        <div className='flex flex-row'>
          <Logo />

          <p className='text-xs text-gray-400 flex ml-auto'>
            Booking ID: {booking.bookingID}
          </p>
        </div>

        <div className='grid grid-cols-2 gap-3 items-center'>
          {content({ title: 'Passenger', desc: booking.passengerName })}
          {content({ title: 'Trip No', desc: booking.tripNo })}
          {content({ title: 'Date', desc: booking.date })}
          {content({
            title: 'Boarding Time',
            desc: booking.departureTime,
          })}
          {content({
            title: 'From',
            desc: booking.departureLocation,
          })}
          {content({
            title: 'To',
            desc: booking.arrivalLocation,
          })}
          {content({ title: 'Bus Operator', desc: booking.busOperator })}
          {content({ title: 'Bus Type', desc: booking.busType })}
          {content({ title: 'Seat', desc: booking.seatNo })}
          {content({ title: 'Price', desc: booking.price })}
        </div>
      </div>
      <CustomButton
        title='Download Ticket'
        onClick={() => generatePDF(booking)}
        className='w-4/12 mx-auto'
      />
    </>
  );
};

export default Ticket;