import CustomButton from "../../../components/common/CustomButton";
import CustomInput from "../../../components/common/CustomInput";
import Card from "../../../components/common/Card";

const PassengerCreateForm = () => {
  return (
    <div className="flex flex-col space-y-4 w-full mx-auto">
      <Card header="Create New Passenger">
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
      </Card>
    </div>
  );
};

export default PassengerCreateForm;
