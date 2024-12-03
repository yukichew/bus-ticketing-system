import React from "react";

const TripSummary = ({ schedule }) => {
  return (
    <div className='text-sm'>
      {/* boarding point */}
      <div className='text-gray-700'>
        <p className='font-semibold'>{schedule.etd}</p>
        <p className='leading-snug'>
          {schedule.routes.boardingLocation.address}
        </p>
      </div>

      <div className='w-0.5 bg-gray-400 h-8 ml-5 my-2'></div>

      {/* dropping point */}
      <div className='text-gray-700'>
        <p className='font-semibold'>{schedule.eta}</p>
        <p className='leading-snug'>
          {schedule.routes.arrivalLocation.address}
        </p>
      </div>
    </div>
  );
};

export default TripSummary;
