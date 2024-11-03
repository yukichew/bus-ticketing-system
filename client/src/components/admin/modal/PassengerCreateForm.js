import CustomButton from "../../../components/common/CustomButton";
import CustomInput from "../../../components/common/CustomInput";

const PassengerCreateForm = () => {
  return (
    <div className="flex flex-col space-y-4 w-100">
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
      <CustomInput
        placeholder="Enter date of birth"
        id="dob"
        name="dob"
        type="date"
        required
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
