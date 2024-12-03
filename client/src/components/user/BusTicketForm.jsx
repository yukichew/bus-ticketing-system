import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import DatePickerField from "../common/DatePickerField";
import { format } from "date-fns";

const BusTicketForm = ({
  formState,
  setFormState,
  onSubmit,
  className,
  customButtonClassName,
  showSearchButton = true,
}) => {
  const { originState, destinationState, travelDate, returnDate } = formState;

  const handleChange = (key, value) => {
    if (key === "travelDate" || key === "returnDate") {
      value = value ? format(new Date(value), "yyyy-MM-dd") : null;
    }
    setFormState((prevState) => ({ ...prevState, [key]: value }));
  };

  return (
    <form className={`space-y-2 ${className}`} onSubmit={onSubmit}>
      <CustomInput
        id={"originState"}
        name={"originState"}
        placeholder={"From"}
        type={"text"}
        icon={IoLocationOutline}
        required
        value={originState}
        onChange={(e) => handleChange("originState", e.target.value)}
      />
      <CustomInput
        id={"destinationState"}
        name={"destinationState"}
        placeholder={"To"}
        type={"text"}
        icon={IoLocationOutline}
        required
        value={destinationState}
        onChange={(e) => handleChange("destinationState", e.target.value)}
      />
      <DatePickerField
        id={"travelDate"}
        name={"travelDate"}
        placeholder={"Departure Date"}
        required
        selectedDate={travelDate}
        setSelectedDate={(date) => handleChange("travelDate", date)}
      />
      <DatePickerField
        id={"returnDate"}
        name={"returnDate"}
        placeholder={"Return Date"}
        selectedDate={returnDate}
        setSelectedDate={(date) => handleChange("returnDate", date)}
      />
      {showSearchButton && (
        <CustomButton
          title={"Search Buses"}
          type={"submit"}
          className={customButtonClassName}
        />
      )}
    </form>
  );
};

export default BusTicketForm;
