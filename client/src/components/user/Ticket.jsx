import React, { useRef } from 'react';
import Logo from '../../assets/Logo';
import CustomButton from '../common/CustomButton';
import { format } from 'date-fns';
import html2pdf from 'html2pdf.js';

const Ticket = ({ booking, seatNumber, user }) => {
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
      <div
        ref={ticketRef}
        className='p-6 rounded-lg border font-poppins m-4'
      >
        <div className='flex flex-row'>
          <Logo />

          <p className='text-xs text-gray-400 flex ml-auto'>
            Booking ID: {booking.bookingID}
          </p>
        </div>

        <div className='grid grid-cols-2 gap-3 items-center'>
          {content({ title: 'Passenger', desc: user.userName })}
          {content({
            title: 'Trip No',
            desc: booking.busSchedule.busScheduleID,
          })}
          {content({
            title: 'Date',
            desc: format(
              new Date(booking.busSchedule.travelDate),
              'yyyy-MM-dd'
            ),
          })}
          {content({
            title: 'Boarding Time',
            desc: booking.busSchedule.etd,
          })}
          {content({
            title: 'From',
            desc: booking.busSchedule.routes.boardingLocation.name,
          })}
          {content({
            title: 'To',
            desc: booking.busSchedule.routes.arrivalLocation.name,
          })}
          {content({
            title: 'Bus Operator',
            desc: booking.busSchedule.postedBy.fullname,
          })}
          {content({
            title: 'Bus Type',
            desc: booking.busSchedule.busInfo.busType.types,
          })}
          {content({ title: 'Seat', desc: seatNumber })}
          {content({ title: 'Price', desc: booking.busSchedule.routes.price })}
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
