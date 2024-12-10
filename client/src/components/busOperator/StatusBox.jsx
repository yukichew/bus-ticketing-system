import React, { useState, useEffect } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

const StatusBox = ({ statuses, variant = {}, activeStatusProp, onStatusChange }) => {
    const [activeStatus, setActiveStatus] = useState(activeStatusProp || statuses[0].label);

    useEffect(() => {
        if (activeStatusProp) {
            setActiveStatus(activeStatusProp);
        }
    }, [activeStatusProp]);

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setActiveStatus(newStatus);
        onStatusChange(newStatus);
    };

    const renderStatusOptions = () => {
        return statuses.map((status) => (
            <option key={status.label} value={status.label} className="bg-white text-gray-600">
                {status.label}
            </option>
        ));
    };

    const appliedStyles = variant[activeStatus.toLowerCase()] || '';

    return (
        <div className={`relative inline-block w-32 ${appliedStyles} rounded-lg border-1 border-gray-50 shadow-md`}>
            <select
                value={activeStatus}
                onChange={handleStatusChange}
                className="block w-full h-8 appearance-none font-poppins font-medium text-sm px-3 py-1 bg-transparent outline-none border-none"
            >
                {renderStatusOptions()}
            </select>
            <RiArrowDropDownLine size={24} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-500" />
        </div>
    );
};

export default StatusBox;