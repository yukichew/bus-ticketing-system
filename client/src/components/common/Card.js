import React, { useState } from 'react';

const Card = ({ header, children, Icon, onClick, tooltip, bgColor }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className={`rounded-lg p-6 shadow-md mt-6 w-full mx-auto ${bgColor || 'bg-slate-50'}`} // Use bgColor prop or fallback to default
    >
      {header && (
        <div className="flex justify-between items-start">
          <div className="font-poppins font-semibold text-lg text-primary mb-4">
            {header}
          </div>
          {Icon && (
            <div 
              onClick={onClick} 
              className="relative cursor-pointer"
              onMouseEnter={() => setShowTooltip(true)} 
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Icon className="w-6 h-6 text-gray-500 hover:text-primary transition duration-200" />
              {showTooltip && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs font-poppins rounded py-2 px-4">
                  {tooltip}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default Card;