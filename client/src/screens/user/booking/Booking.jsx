import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../../components/common/CustomButton';
import Container from '../../../components/Container';
import PassengerForm from './PassengerForm';
import { format } from 'date-fns';
import { buyTicket } from '../../../api/booking';
import { toast } from 'react-toastify';

const Booking = () => {
  const navigate = useNavigate();
  const [passengerDetails, setPassengerDetails] = useState([]);

  const selectedSeats =
    JSON.parse(localStorage.getItem('onwardSelectedSeats')) || [];

  const returnSelectedSeats =
    JSON.parse(localStorage.getItem('returnSelectedSeats')) || [];

  const schedule = JSON.parse(localStorage.getItem('selectedSchedule'));

  const returnSchedule = JSON.parse(
    localStorage.getItem('selectedReturnSchedule')
  );

  useEffect(() => {
    if (!schedule) {
      toast.error('You have not selected a schedule.');
      navigate('/');
    }
  }, [schedule, navigate]);

  if (!schedule) {
    return null;
  }

  const date = format(new Date(schedule.travelDate), 'yyyy-MM-dd');

  const totalAmount =
    selectedSeats.length * schedule.routes.price +
    returnSelectedSeats.length *
      (returnSchedule ? returnSchedule.routes.price : 0);

  const handlePassengerChange = (index, details) => {
    const updatedDetails = [...passengerDetails];
    updatedDetails[index] = details;
    setPassengerDetails(updatedDetails);
  };

  const handleSubmit = async () => {
    const onwardSeats = selectedSeats.map((seatNumber, idx) => ({
      seatNumber,
      passenger: passengerDetails[idx],
    }));

    const returnSeats = returnSchedule
      ? returnSelectedSeats.map((seatNumber, idx) => ({
          seatNumber,
          passenger: passengerDetails[idx],
        }))
      : [];

    const bookingDetails = {
      onwardTrip: {
        busScheduleID: schedule.busScheduleID,
        amountPaid: selectedSeats.length * schedule.routes.price,
        seats: onwardSeats,
      },
      returnTrip: returnSchedule
        ? {
            busScheduleID: returnSchedule.busScheduleID,
            amountPaid:
              returnSelectedSeats.length * returnSchedule.routes.price,
            seats: returnSeats,
          }
        : null,
    };

    const response = await buyTicket(bookingDetails);
    if (response?.error) {
      return toast.error(response.message);
    }

    navigate(`/payment`, {
      state: {
        amountPaid: totalAmount,
        bookingID: response.bookingID,
        fullname: passengerDetails[0].fullname,
        email: passengerDetails[0].email,
      },
    });
  };

  return (
    <Container>
      <div className='max-w-7xl mx-auto space-y-5 pt-10 pb-12 px-10'>
        {/* trip summary */}
        <div className='bg-slate-50 border p-4 rounded-md shadow-md border-t-4 border-t-primary'>
          <div className='text-center'>
            <h3 className='font-bold text-lg'>Trip Summary</h3>
            <p className='text-sm'>
              Departure Date Time: {date} {schedule.etd}
            </p>
          </div>

          <div className='flex justify-between items-center'>
            <div>
              <p className='font-semibold'>Departure</p>
              <p>{schedule.routes.boardingLocation.name}</p>
            </div>
            <div className='text-right'>
              <p className='font-semibold'>Arrival</p>
              <p>{schedule.routes.arrivalLocation.name}</p>
            </div>
          </div>

          {/* return trip summary */}
          {returnSchedule && (
            <div className='mt-4'>
              <div className='text-center'>
                <h3 className='font-bold text-lg'>Return Trip</h3>
                <p className='text-sm'>
                  Departure Date Time:{' '}
                  {format(new Date(returnSchedule.travelDate), 'yyyy-MM-dd')}{' '}
                  {returnSchedule.etd}
                </p>
              </div>

              <div className='flex justify-between items-center'>
                <div>
                  <p className='font-semibold'>Departure</p>
                  <p>{returnSchedule.routes.boardingLocation.name}</p>
                </div>
                <div className='text-right'>
                  <p className='font-semibold'>Arrival</p>
                  <p>{returnSchedule.routes.arrivalLocation.name}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* passenger details */}
        <div>
          <h2 className='text-xl font-bold mb-2 pl-1'>Passenger Details</h2>
          <div className='space-y-3'>
            {selectedSeats.map((seatNumber, index) => (
              <PassengerForm
                key={seatNumber}
                seatNumber={seatNumber}
                passengerNumber={index + 1}
                onChange={(details) => handlePassengerChange(index, details)}
              />
            ))}
          </div>
        </div>

        {/* price */}
        <div className='bg-slate-50 p-4 rounded-md shadow-md border'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-lg font-bold'>Total Amount</h3>
            </div>
            <div>
              <h3 className='text-lg font-bold'>RM {totalAmount}</h3>
            </div>
          </div>
        </div>

        <CustomButton
          title={'PROCEED TO PAYMENT'}
          type={'submit'}
          className={'w-1/5 ml-auto'}
          onClick={handleSubmit}
        />
      </div>
    </Container>
  );
};

export default Booking;
