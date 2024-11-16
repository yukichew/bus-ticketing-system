import CustomButton from "../../../components/common/CustomButton";
import CustomInput from "../../../components/common/CustomInput";
import DatePickerField from "../../common/DatePickerField";

const PassengerCreateForm = () => {
  return (
    <div className="flex flex-col space-y-4 w-[400px]">
      <div className="flex justify-between items-start"></div>
      <div className="font-poppins font-semibold text-lg text-primary mb-4">
        <header className="mb-2">Add New Passenger</header>
      </div>
      <CustomInput
        placeholder="Enter full name"
        id="fullName"
        name="fullName"
        type="text"
        required
      />
      <CustomInput
        placeholder="Enter email"
        id="email"
        name="email"
        type="email"
        required
      />
      <DatePickerField
        id="dob"
        name="dob"
        type="date"
        placeholder={"Date of Birth"}
      />
      <CustomInput
        placeholder="Enter phone number"
        id="phoneNumber"
        name="phoneNumber"
        type="text"
        required
      />
      <CustomButton title={"Create"} />
    </div>
  );
};

export default PassengerCreateForm;