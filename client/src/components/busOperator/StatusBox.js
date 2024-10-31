import React, { useState } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";

const StatusBox = ({ status, variant = 'info', onStatusChange }) => {
    const [currentStatus, setCurrentStatus] = useState(status);

    const statusOptions = ['Success', 'Danger', 'Warning', 'Info'];

    const variantStyles = {
        success: 'text-lime-700 bg-lime-100', 
        danger: 'text-red-600 bg-red-100',
        warning: 'text-yellow-600 bg-yellow-100',
        info: 'text-sky-700 bg-sky-100',
    };

    const appliedStyles = variantStyles[variant] || variantStyles['info'];

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setCurrentStatus(newStatus);
        onStatusChange(newStatus);
    };

    return (
        <div className={`relative inline-block w-40 ${appliedStyles} rounded-lg border-1 border-gray-50 shadow-md`}>
            <select
                value={currentStatus}
                onChange={handleStatusChange}
                className={`block w-full h-8 appearance-none font-poppins font-medium text-sm px-3 py-1 bg-transparent outline-none border-none`}
            >
                {statusOptions.map(option => (
                    <option
                        key={option}
                        value={option}
                        className="bg-white text-gray-600 focus:bg-gray-100"
                    >
                        {option}
                    </option>
                ))}
            </select>
            <RiArrowDropDownLine size={24} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-500" />
        </div>
    );
};

export default StatusBox;