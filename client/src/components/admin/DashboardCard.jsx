import React from "react";
import { MdViewCompact } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const DashboardCard = ({
  title,
  value,
  gradientColors,
  icon,
  link,
  sectionState, 
}) => {
  return (
    <div
      className="flex items-center p-4 rounded-lg w-full font-poppins"
      style={{
        backgroundImage: `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]})`,
      }}
    >
      {/* Icon Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-16 h-16 flex items-center justify-center mr-4">
            {icon &&
              React.cloneElement(icon, {
                className: "text-white text-4xl",
              })}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex w-full items-center justify-between">
        <div className="text-left">
          <h4 className="text-white text-lg font-semibold mb-0">{title}</h4>
          <span className="text-white">{value}</span>
        </div>

        {/* Link Button */}
        <div className="ml-2">
          {/* If link is provided, wrap the button with Link */}
          {link ? (
            <Link to={link} state={{ section: sectionState }}>
              <button className="p-1 rounded-full text-white focus:outline-none">
                <MdViewCompact className="text-3xl" />
              </button>
            </Link>
          ) : (
            <button className="p-1 rounded-full text-white focus:outline-none">
              <MdViewCompact className="text-3xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
