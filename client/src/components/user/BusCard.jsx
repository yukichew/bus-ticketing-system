import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { GoPeople } from 'react-icons/go';
import { LiaSquareFullSolid } from 'react-icons/lia';
import { busInfoTabs } from '../../constants/TabItems';
import Modal from '../common/Modal';
import Tabs from '../common/Tabs';
import Seatmap from './Seatmap';
import CustomButton from '../common/CustomButton';
import { useNavigate } from 'react-router-dom';
import { getOccupiedSeats } from '../../api/booking';
import { getActiveRatings } from '../../api/rating';
import { toast } from 'react-toastify';

const BusCard = ({ schedule }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showSeatmap, setShowSeatmap] = useState(false);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [onwardSelectedSeats, setOnwardSelectedSeats] = useState([]);
  const [returnSelectedSeats, setReturnSelectedSeats] = useState([]);

  const isRoundTrip = localStorage.getItem('isRoundTrip') === 'true';
  const onwardSchedule = JSON.parse(localStorage.getItem('selectedSchedule'));
  const returnSchedule = JSON.parse(
    localStorage.getItem('selectedReturnSchedule')
  );
  const searchQuery = JSON.parse(localStorage.getItem('busSearch'));

  const handleSeatSelection = (seatNumber) => {
    let updatedSeats = [];

    if (isRoundTrip) {
      if (!onwardSchedule) {
        updatedSeats = onwardSelectedSeats.includes(seatNumber)
          ? onwardSelectedSeats.filter((seat) => seat !== seatNumber)
          : [...onwardSelectedSeats, seatNumber];
        setOnwardSelectedSeats(updatedSeats);
        localStorage.setItem(
          'onwardSelectedSeats',
          JSON.stringify(updatedSeats)
        );
        return;
      }

      if (
        returnSelectedSeats.length >= onwardSelectedSeats.length &&
        !returnSelectedSeats.includes(seatNumber)
      ) {
        return toast.error(
          'You can only select the same number of seats as the onward trip.'
        );
      }

      updatedSeats = returnSelectedSeats.includes(seatNumber)
        ? returnSelectedSeats.filter((seat) => seat !== seatNumber)
        : [...returnSelectedSeats, seatNumber];
      setReturnSelectedSeats(updatedSeats);
      localStorage.setItem('returnSelectedSeats', JSON.stringify(updatedSeats));
      return;
    }

    updatedSeats = onwardSelectedSeats.includes(seatNumber)
      ? onwardSelectedSeats.filter((seat) => seat !== seatNumber)
      : [...onwardSelectedSeats, seatNumber];
    setOnwardSelectedSeats(updatedSeats);
    localStorage.setItem('onwardSelectedSeats', JSON.stringify(updatedSeats));
  };

  const handleProceed = () => {
    if (isRoundTrip) {
      if (!onwardSchedule) {
        localStorage.setItem('selectedSchedule', JSON.stringify(schedule));
        toast.info('Onward trip selected. Please choose a return trip.');
        setShowSeatmap(false);
        const queryParams = new URLSearchParams({
          originState: searchQuery.destinationState,
          destinationState: searchQuery.originState,
          travelDate: searchQuery.returnDate,
        }).toString();
        navigate(`/bus-tickets?${queryParams}`);
        return;
      }

      localStorage.setItem('selectedReturnSchedule', JSON.stringify(schedule));
      navigate('/booking');
      return;
    }

    localStorage.setItem('selectedSchedule', JSON.stringify(schedule));
    navigate('/booking');
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.removeItem('selectedSeats');
    }, 300000);

    return () => clearTimeout(timeout);
  }, [schedule]);

  useEffect(() => {
    const fetchOccupiedSeats = async () => {
      const data = await getOccupiedSeats(schedule.busScheduleID);
      if (data.error) return;
      setOccupiedSeats(data);
    };
    fetchOccupiedSeats();
  }, [schedule]);

  useEffect(() => {
    const fetchReviews = async () => {
      const results = await getActiveRatings(schedule.postedBy.id);
      if (results && results.length > 0) {
        const avgRating =
          results.reduce((sum, review) => sum + review.rate, 0) /
          results.length;
        setAverageRating(avgRating.toFixed(1));
      }
    };
    fetchReviews();
  }, [schedule.postedBy.id]);

  const availableSeats =
    schedule.busInfo.busType.noOfSeats - occupiedSeats.length;

  return (
    <div className='rounded-lg font-poppins shadow-md mb-4 w-11/12 lg:max-w-7xl mx-auto bg-slate-50 border'>
      <div className='grid grid-cols-1 md:grid-cols-6 p-4 items-center'>
        {/* bus operator name */}
        <div className='flex flex-row items-center'>
          <img
            src={schedule.postedBy.companyLogo}
            alt={schedule.postedBy.fullname}
            className='rounded-full w-10 h-10 md:w-14 md:h-14'
          />
          <div className='ml-2'>
            <p className='text-sm font-semibold md:text-base'>
              {schedule.postedBy.fullname}
              {schedule.name}
            </p>
            <p className='font-medium text-gray-600 text-xs md:text-sm'>
              {schedule.busInfo.busType.types}
            </p>
          </div>
        </div>

        <p className='font-bold text-lg md:hidden'>
          RM {schedule.routes.price}
        </p>

        {/* departure and arrival */}
        <div className='grid grid-cols-3 items-center col-span-3 text-center mt-4 mb-4 md:mt-0 md:mb-0'>
          <div>
            <p className='font-semibold text-lg md:text-xl'>{schedule.etd}</p>
            <p className='text-gray-600 text-xs md:text-sm'>
              {schedule.routes.boardingLocation.name}
            </p>
          </div>

          <div className='text-center'>
            <p className='text-gray-500 text-sm font-medium'>
              {schedule.duration}
            </p>
            <div className='flex items-center justify-center mx-2 text-gray-300'>
              <LiaSquareFullSolid size={10} />
              <div className='border-t-2 border-gray-300 w-full -mx-1'></div>
              <LiaSquareFullSolid size={10} />
            </div>
          </div>

          <div>
            <p className='font-semibold text-lg md:text-xl'>{schedule.eta}</p>
            <p className='text-gray-600 text-xs md:text-sm'>
              {schedule.routes.arrivalLocation.name}
            </p>
          </div>
        </div>

        {/* price and capacity */}
        <div className='grid grid-cols-2 items-center'>
          <p className='hidden md:block ml-auto font-bold text-xl'>
            RM {schedule.routes.price}0
          </p>

          <div className='flex-row flex md:flex-col md:justify-center md:items-center md:ml-auto'>
            <div className='bg-green-600 rounded-md p-1 md:p-2'>
              <div className='flex flex-row items-center text-white'>
                <FaStar className='w-2 md:w-3' />
                <p className='font-medium text-xs md:text-sm ml-1'>
                  {averageRating}
                </p>
              </div>
            </div>

            <div className='flex flex-row items-center text-gray-600 ml-2 md:ml-0 md:mt-1'>
              <GoPeople className='w-3 md:w-4' />
              <p className='font-medium text-xs text-center pl-1'>
                {availableSeats}
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <div className='hidden md:block w-3/5'>
            <CustomButton
              title='SELECT'
              className='font-semibold'
              type='button'
              onClick={() => {
                setShowSeatmap(true);
              }}
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className='text-sm md:text-base text-primary mt-1 font-medium hover:underline'
          >
            More Info
          </button>
        </div>
      </div>

      {/* More info modal */}
      <Modal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        className='w-11/12 md:w-3/4 lg:w-1/2'
      >
        <Tabs
          tabs={busInfoTabs.map((tab) => ({
            ...tab,
            content:
              typeof tab.content === 'function'
                ? tab.content({ schedule })
                : React.cloneElement(tab.content, { schedule }),
          }))}
          orientation='vertical'
        />
      </Modal>

      {/* Seatmap */}
      <Modal
        isVisible={showSeatmap}
        onClose={() => setShowSeatmap(false)}
        className='w-auto'
      >
        <h2 className='text-lg lg:text-xl font-semibold font-poppins'>
          Select your seat
        </h2>
        <Seatmap
          layout={
            schedule.busInfo.busType.types.includes('2+1') ? '2+1' : 'Executive'
          }
          schedule={schedule}
          selectedSeats={
            isRoundTrip
              ? !onwardSchedule
                ? onwardSelectedSeats
                : returnSelectedSeats
              : onwardSelectedSeats
          }
          handleSelect={handleSeatSelection}
          occupiedSeats={occupiedSeats}
        />
        <CustomButton
          title={'Proceed'}
          type='button'
          onClick={handleProceed}
          className='mt-2'
        />
      </Modal>
    </div>
  );
};

export default BusCard;
