import React from 'react';

const Card = ({ header, children, width = "w-4/5" }) => {
  return (
    <div className={`bg-gray-100 rounded-lg p-6 shadow-md mt-6 mb-6 ${width} mx-auto`}>
      {header && (
        <div className="font-poppins text-lg font-semibold mb-4">
          {header}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default Card;