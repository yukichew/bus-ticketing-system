import React, { useState, useEffect } from "react";
import CustomInput from "../../../components/common/CustomInput";

const ViewBusRoutes = ({ schedule }) => {
  const [routeInfo, setRouteInfo] = useState({
    busPlate: "",
    busType: "",
    busNoOfSeats: "",
  });

  useEffect(() => {
    if (schedule) {
      setRouteInfo({
        busPlate: schedule.busPlate,
        busType: schedule.busType,
        busNoOfSeats: schedule.busNoOfSeats,
      });
    }
  }, [schedule]);

  const handleRouteChange = (e) => {
    const { id, value } = e.target;
    setRouteInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  return (
    <div className="flex flex-col space-y-4 w-[400px]">
      <div className="pointer-events-none">
        <label
          htmlFor="busPlate"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Bus Plate
        </label>
        <CustomInput
          placeholder="Enter bus plate"
          id="busPlate"
          name="busPlate"
          type="text"
          value={routeInfo.busPlate}
          onChange={handleRouteChange}
          required
        />
      </div>
      <div className="pointer-events-none">
        <label
          htmlFor="busType"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          Bus Type
        </label>
        <CustomInput
          placeholder="Enter Bus Type"
          id="busType"
          name="busType"
          type="text"
          value={routeInfo.busType}
          onChange={handleRouteChange}
          className="pointer-events-none"
          required
        />
      </div>
      <div className="pointer-events-none">
        <label
          htmlFor="noOfSeats"
          className="block text-sm font-poppins font-medium text-gray-700 pb-2"
        >
          No of Seats
        </label>
        <CustomInput
          placeholder="Enter No of Seats"
          id="noOfSeats"
          name="noOfSeats"
          type="text"
          value={routeInfo.busNoOfSeats}
          onChange={handleRouteChange}
          className="pointer-events-none"
          required
        />
      </div>
    </div>
  );
};

export default ViewBusRoutes;
