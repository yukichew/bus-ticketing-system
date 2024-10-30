import React from "react";
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";

const DashboardCard = ({ title, value, gradientColors, iconType }) => {
  return (
    <div
      className="flex items-center p-4 rounded-lg w-full font-poppins"
      style={{
        backgroundImage: `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]})`,
      }}
    >
      {/* Icon Section */}
      <span className="chart mr-4">
        {iconType === "up" ? (
          <IoMdTrendingUp className="text-white" />
        ) : (
          <IoMdTrendingDown className="text-white" />
        )}
      </span>

      {/* Content Section */}
      <div className="flex w-full items-center justify-between">
        <div className="text-left">
          <h4 className="text-white text-lg font-semibold mb-0">{title}</h4>
          <span className="text-white">{value}</span>
        </div>

        {/* Three Dots Button */}
        <div className="ml-2">
          <button className="p-1 rounded-full text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
