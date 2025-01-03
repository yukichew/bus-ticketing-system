import React, { useEffect, useState } from 'react';
import BookingCard from '../../components/user/BookingCard';
import Container from '../../components/Container';
import { useAuth } from '../../utils/AuthContext';
import { filterBookings } from '../../api/booking';
import { getUserProfile } from '../../api/auth';
import CustomInput from '../../components/common/CustomInput';
import DatePickerField from '../../components/common/DatePickerField';
import { filterStatusOptions } from '../../constants/UserConstants';
import useDebounce from '../../utils/useDebounce';
import { format } from 'date-fns';
import { IoFilter } from 'react-icons/io5';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Trips = () => {
  const { auth } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState({});
  const [filters, setFilters] = useState({
    status: '',
    busOperator: '',
    originState: '',
    destinationState: '',
    travelDate: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const debouncedFilters = useDebounce(filters, 500);

  const bookingsPerPage = 3;

  useEffect(() => {
    const fetchBookings = async () => {
      if (auth) {
        const profile = await getUserProfile(auth.token);
        setUser({ ...profile, token: auth.token });

        if (profile) {
          const result = await filterBookings({
            ...debouncedFilters,
            page: currentPage,
            limit: bookingsPerPage,
          });

          setBookings(Array.isArray(result.bookings) ? result.bookings : []);
          setTotalPages(Math.ceil(result.totalCount / bookingsPerPage));
        }
      }
    };

    fetchBookings();
  }, [debouncedFilters, auth, currentPage]);

  const handleStatusChange = (status) => {
    setFilters((prevFilters) => {
      const isSelected = prevFilters.status.includes(status);
      const updatedStatus = isSelected
        ? prevFilters.status.filter((item) => item !== status)
        : [...prevFilters.status, status];
      return { ...prevFilters, status: updatedStatus };
    });
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Container>
      <div className='w-4/5 mx-auto my-8 flex flex-col md:flex-row gap-6'>
        {/* filters */}
        <div className='w-full md:w-1/4 bg-gray-100 p-4 rounded-lg shadow-sm max-h-96'>
          <h3 className='font-poppins font-bold text-xl mb-4 flex items-center'>
            <IoFilter
              size={16}
              className='mr-2'
            />{' '}
            Filters
          </h3>
          <div className='space-y-3'>
            <CustomInput
              id={'originState'}
              name={'originState'}
              placeholder={'From'}
              type={'text'}
              value={filters.originState}
              onChange={(e) =>
                setFilters({ ...filters, originState: e.target.value })
              }
            />
            <CustomInput
              id={'destinationState'}
              name={'destinationState'}
              placeholder={'To'}
              type={'text'}
              value={filters.destinationState}
              onChange={(e) =>
                setFilters({ ...filters, destinationState: e.target.value })
              }
            />
            <DatePickerField
              id={'travelDate'}
              name={'travelDate'}
              placeholder={'Date'}
              selectedDate={filters.travelDate}
              setSelectedDate={(date) =>
                setFilters({
                  ...filters,
                  travelDate: date ? format(new Date(date), 'yyyy-MM-dd') : '',
                })
              }
            />
            <div>
              <h4 className='font-medium text-gray-700 mb-2'>Status</h4>
              {filterStatusOptions.map((status) => (
                <label
                  key={status}
                  className='flex items-center mb-2'
                >
                  <input
                    type='checkbox'
                    className='mr-2'
                    checked={filters.status.includes(status)}
                    onChange={() => handleStatusChange(status)}
                  />
                  {status}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* results */}
        <div className='w-full md:w-3/4'>
          <h3 className='font-poppins font-bold text-2xl mb-5'>
            Booking History
          </h3>
          {bookings.length === 0 ? (
            <div className='text-center text-lg text-slate-600'>
              No bookings found.
            </div>
          ) : (
            <div className='space-y-4'>
              {bookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking.booking}
                  seatNumber={booking.seatNumber}
                  user={user}
                />
              ))}
            </div>
          )}

          {/* pagination */}
          {totalPages > 1 && (
            <div className='flex justify-center space-x-2 mt-6 ml-auto'>
              <button
                className={`font-medium ${
                  currentPage === 1 ? 'text-gray-400' : 'hover:text-primary'
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`font-medium ${
                  currentPage === totalPages
                    ? 'text-gray-400'
                    : 'hover:text-primary'
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Trips;
