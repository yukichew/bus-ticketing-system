import React from 'react';
import StatusBox from './StatusBox';

export const BusTypeStatus = () => {
    const busTypeStatuses = [
        { label: 'Active' },
        { label: 'Inactive' },
    ];

    const variantStyles = {
        active: 'text-lime-700 bg-lime-100',
        inactive: 'text-red-600 bg-red-100',
    };

    const handleStatusChange = (newStatus) => {
        console.log('Selected Bus Type Status:', newStatus);
    };

    return (
        <StatusBox 
            statuses={busTypeStatuses} 
            variant={variantStyles} 
            activeStatusProp="Active" 
            onStatusChange={handleStatusChange}
        />
    );
};