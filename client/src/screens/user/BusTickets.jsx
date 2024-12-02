import React, { useEffect, useMemo, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { TbArrowBigRightFilled } from "react-icons/tb";
import BusCard from "../../components/user/BusCard";
import BusTicketForm from "../../components/user/BusTicketForm";
import { searchSchedule } from "../../api/schedule";
import { useLocation } from "react-router-dom";

const BusTickets = () => {
  const location = useLocation();
  const filters = useMemo(() => location.state || {}, [location.state]);
  const [busSchedules, setBusSchedules] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      const results = await searchSchedule(filters);
      setBusSchedules(results);
    };

    fetchSchedules();
  }, [filters]);

  return (
    <div className="py-5 font-poppins">
      {/* search results header */}
      <div className="my-4 flex flex-col bg-white shadow-md border-t-4 border-t-primary rounded-lg w-11/12 lg:max-w-7xl mx-auto p-4">
        <div className="flex flex-row mb-2 font-semibold text-grey-800 text-base md:text-xl items-center">
          <h5>{filters.origin}</h5>
          <TbArrowBigRightFilled className="mx-2" size={18} />
          <h5>{filters.destination}</h5>
          <button
            className="md:ml-3 ml-auto text-center rounded-md font-medium border-2 border-slate-500 text-slate-500 hover:text-white hover:bg-primary text-sm px-2"
            onClick={() => setIsFormVisible(true)}
          >
            Modify
          </button>
        </div>
        <p className="text-gray-600 font-light text-sm">
          {" "}
          {filters.travelDate}
        </p>
      </div>

      {/* search form */}
      {isFormVisible && (
        <div className="w-11/12 lg:max-w-7xl mx-auto border-2 rounded-lg p-4 relative">
          <button onClick={() => setIsFormVisible(false)}>
            <IoMdCloseCircle
              size={25}
              className="cursor-pointer text-slate-500 hover:text-primary absolute -top-3 -right-3"
            />
          </button>
          {/* <BusTicketForm
            className="space-y-2 md:flex md:flex-row md:space-y-0 md:space-x-2"
            origin={origin}
            destination={destination}
            departureDate={departureDate}
            setDepartureDate={setDepartureDate}
            returnDate={returnDate}
            setReturnDate={setReturnDate}
            customButtonClassName="md:w-4/6"
          /> */}
        </div>
      )}

      {/* filter and search results count */}
      <div className="w-11/12 lg:max-w-7xl mx-auto my-4 pl-3 flex flex-row items-center">
        <p className="text-gray-500">
          <span className="font-semibold text-secondary">
            {busSchedules.length > 0 ? busSchedules.length : "No"}
          </span> {" "}
          buses found
        </p>

        <button className="ml-auto flex items-center font-medium hover:text-primary pr-1">
          <IoFilter size={16} />
          <p className="mx-1">Filters</p>
        </button>
      </div>

      {/* search results */}
      <div className="">
        {Array.isArray(busSchedules) &&
          busSchedules.map((schedule) => (
            <BusCard key={schedule.id} schedule={schedule} />
          ))}
      </div>
    </div>
  );
};
export default BusTickets;
