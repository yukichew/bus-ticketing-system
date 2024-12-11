import React from "react";

const BusScheduleSummary = ({ schedule }) => {
  if (!schedule) return null;

  return (
    <div className="text-sm">
      <h2 className="text-lg font-semibold mb-3">
        Boarding and Dropping Points
      </h2>

      <div className="text-gray-700">
        <p className="font-bold">Travel Date</p>
        <p className="leading-snug">{schedule.travelDate}</p>
      </div>
      <div className="h-2 ml-5 my-2"></div>
      {/* Boarding point */}
      <div className="text-gray-700">
        <p className="font-bold">{schedule.etd}</p>
        <p className="leading-snug font-semibold">
          {schedule.boardingLocation}
        </p>
        <p className="leading-snug">{schedule.boardingAddress}</p>
      </div>

      <div className="w-0.5 bg-gray-400 h-8 ml-5 my-2"></div>

      {/* Dropping point */}
      <div className="text-gray-700">
        <p className="font-semibold">{schedule.eta}</p>
        <p className="leading-snug font-semibold">{schedule.arrivalLocation}</p>
        <p className="leading-snug">{schedule.arrivalAddress}</p>
      </div>
    </div>
  );
};

export default BusScheduleSummary;
