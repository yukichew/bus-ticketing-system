import React from 'react';
import StatusBox from './StatusBox';

export const BusScheduleStatus = () => {
    const busScheduleStatuses = [
        { label: 'Scheduled' },
        { label: 'On Time' },
        { label: 'En Route' },
        { label: 'Delayed' },
        { label: 'Postponed' },
        { label: 'Canceled' },
    ];

    const variantStyles = {
        scheduled: 'text-blue-600 bg-blue-100',
        'on time': 'text-lime-700 bg-lime-100',
        'en route': 'text-yellow-600 bg-yellow-100',
        delayed: 'text-orange-600 bg-orange-100',
        postponed: 'text-purple-600 bg-purple-100',
        canceled: 'text-red-600 bg-red-100',
    };

    const handleStatusChange = (newStatus) => {
        console.log('Selected Bus Schedule Status:', newStatus);
    };

    return (
        <StatusBox 
            statuses={busScheduleStatuses} 
            variant={variantStyles} 
            activeStatusProp="Scheduled" 
            onStatusChange={handleStatusChange}
        />
    );
};