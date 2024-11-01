import React, { useState, useEffect } from "react";
import CustomButton from "../../../components/common/CustomButton";
import CustomInput from "../../../components/common/CustomInput";
import Card from "../../../components/common/Card";

const ViewBusRoutes = ({ operator, onClose }) => {
  const [routeInfo, setRouteInfo] = useState({
    busPlate: "",
    origin: "",
    destination: "",
    etd: "",
    eta: "",
  });

  useEffect(() => {
    if (operator) {
      setRouteInfo({
        busPlate: operator.busPlate,
        origin: operator.origin,
        destination: operator.destination,
        etd: operator.etd,
        eta: operator.eta,
      });
    }
  }, [operator]);

  const handleRouteChange = (e) => {
    const { id, value } = e.target;
    setRouteInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Card header="Bus Route Details">
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
            htmlFor="origin"
            className="block text-sm font-poppins font-medium text-gray-700 pb-2"
          >
            Origin
          </label>
          <CustomInput
            placeholder="Enter origin"
            id="origin"
            name="origin"
            type="text"
            value={routeInfo.origin}
            onChange={handleRouteChange}
            className="pointer-events-none"
            required
          />
        </div>
        <div className="pointer-events-none">
          <label
            htmlFor="destination"
            className="block text-sm font-poppins font-medium text-gray-700 pb-2"
          >
            Destination
          </label>
          <CustomInput
            placeholder="Enter destination"
            id="destination"
            name="destination"
            type="text"
            value={routeInfo.destination}
            onChange={handleRouteChange}
            className="pointer-events-none"
            required
          />
        </div>
        <div className="pointer-events-none">
          <label
            htmlFor="etd"
            className="block text-sm font-poppins font-medium text-gray-700 pb-2"
          >
            ETD
          </label>
          <CustomInput
            placeholder="Enter ETD"
            id="etd"
            name="etd"
            type="text"
            value={routeInfo.etd}
            onChange={handleRouteChange}
            className="pointer-events-none"
            required
          />
        </div>
        <div className="pointer-events-none">
          <label
            htmlFor="eta"
            className="block text-sm font-poppins font-medium text-gray-700 pb-2"
          >
            ETA
          </label>
          <CustomInput
            placeholder="Enter ETA"
            id="eta"
            name="eta"
            type="text"
            value={routeInfo.eta}
            onChange={handleRouteChange}
            className="pointer-events-none"
            required
          />
        </div>
        <CustomButton title={"Approve Bus Routes"} />
      </Card>
    </div>
  );
};

export default ViewBusRoutes;
