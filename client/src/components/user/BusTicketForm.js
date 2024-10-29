import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import CustomButton from '../common/CustomButton';
import CustomInput from '../common/CustomInput';
import DatePickerField from '../common/DatePickerField';

const BusTicketForm = ({
  origin,
  destination,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  onSubmit,
  className,
  customButtonClassName,
}) => {
  return (
    <form className={`space-y-2 ${className}`} onSubmit={onSubmit}>
      <CustomInput
        id={'origin'}
        name={'origin'}
        placeholder={'From'}
        type={'text'}
        icon={IoLocationOutline}
        required
        value={origin}
      />
      <CustomInput
        id={'destination'}
        name={'destination'}
        placeholder={'To'}
        type={'text'}
        icon={IoLocationOutline}
        required
        value={destination}
      />
      <DatePickerField
        id={'departureDate'}
        name={'departureDate'}
        placeholder={'Departure Date'}
        required
        selectedDate={departureDate}
        setSelectedDate={setDepartureDate}
      />
      <DatePickerField
        id={'returnDate'}
        name={'returnDate'}
        placeholder={'Return Date'}
        required
        selectedDate={returnDate}
        setSelectedDate={setReturnDate}
      />
      <CustomButton
        title={'Search Buses'}
        type={'submit'}
        className={customButtonClassName}
      />
    </form>
  );
};

export default BusTicketForm;
