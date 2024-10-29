import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import Table from '../../../components/common/Table';
import StatusBox from '../../../components/busOperator/StatusBox';

const BusTypes = () => {
    const [selectedOption, setSelectedOption] = useState('all');
    const [driverName, setDriverName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    
    const [busData, setBusData] = useState([
        { busPlate: "SMP5792", seats: '30', busType: '2+1', driver: 'John Doe', contactno: '123-456-7890', status: 'Available' },
        { busPlate: "SB8204H", seats: '40', busType: '2+1', driver: 'Jane Smith', contactno: '234-567-8901', status: 'Pending' },
        { busPlate: "QPD1151", seats: '56', busType: '2+2', driver: 'Emily Johnson', contactno: '345-678-9012', status: 'Not Available' },
        { busPlate: "WXY2345", seats: '45', busType: '2+1', driver: 'Michael Brown', contactno: '456-789-0123', status: 'On Road' },
        { busPlate: "TRG4786", seats: '32', busType: '2+2', driver: 'Sarah Davis', contactno: '567-890-1234', status: 'Not Available' },
        { busPlate: "LMN8765", seats: '50', busType: '2+2', driver: 'Chris Wilson', contactno: '678-901-2345', status: 'Available' },
        { busPlate: "KJD2938", seats: '25', busType: '2+1', driver: 'Patricia Martinez', contactno: '789-012-3456', status: 'Available' },
        { busPlate: "HFG5623", seats: '60', busType: '2+2', driver: 'Daniel Garcia', contactno: '890-123-4567', status: 'Not Available' },
        { busPlate: "NPQ1234", seats: '35', busType: '2+1', driver: 'Jennifer Lee', contactno: '901-234-5678', status: 'Available' },
        { busPlate: "BND9821", seats: '55', busType: '2+2', driver: 'Robert Clark', contactno: '012-345-6789', status: 'Available' },
        { busPlate: "CDE4455", seats: '48', busType: '2+1', driver: 'Linda Rodriguez', contactno: '123-456-7891', status: 'Available' },
        { busPlate: "VFR9832", seats: '40', busType: '2+2', driver: 'David Lewis', contactno: '234-567-8902', status: 'Not Available' },
        { busPlate: "LKJ0921", seats: '38', busType: '2+1', driver: 'Elizabeth Walker', contactno: '345-678-9013', status: 'Available' },
        { busPlate: "XYZ7654", seats: '50', busType: '2+1', driver: 'James Hall', contactno: '456-789-0124', status: 'Available' },
        { busPlate: "FTH9843", seats: '42', busType: '2+2', driver: 'Mary Allen', contactno: '567-890-1235', status: 'Available' },
        { busPlate: "JIK1298", seats: '46', busType: '2+2', driver: 'Charles Young', contactno: '678-901-2346', status: 'Not Available' },
        { busPlate: "GHF1290", seats: '52', busType: '2+1', driver: 'Susan King', contactno: '789-012-3457', status: 'Available' },
        { busPlate: "PQR7563", seats: '30', busType: '2+2', driver: 'Mark Wright', contactno: '890-123-4568', status: 'Available' },
        { busPlate: "ASD8732", seats: '28', busType: '2+1', driver: 'Jennifer Scott', contactno: '901-234-5679', status: 'Not Available' },
        { busPlate: "QWE4321", seats: '62', busType: '2+2', driver: 'Christopher Green', contactno: '012-345-6780', status: 'Available' }
    ]);

    const columns = ['Bus Plate', 'No. of Seats', 'Bus Type', 'Driver', 'Contact No.', 'Status'];

    const columnKeys = ['busPlate', 'seats', 'busType', 'driver', 'contactno', 'status'];

    const actionIcons = (row) => (
        <div className="flex justify-center space-x-2">
            <CiEdit className="text-gray-500 text-xl cursor-pointer" />
        </div>
    );

    const enhancedData = busData.map((item, index) => ({
        ...item,
        status: (
            <StatusBox
                status={item.status}
                onStatusChange={(newStatus) => handleStatusChange(newStatus, index)}
            />
        )
    }));

    const handleStatusChange = (newStatus, index) => {
        const updatedData = [...busData];
        updatedData[index].status = newStatus;
        setBusData(updatedData); 
    };

    const selectBoxOptions = ['Available', 'Pending', 'Not Available', 'On Road'];

    return (
        <>
            <div className="border border-gray-100 rounded-lg p-4 bg-white shadow-md mt-5">
                <div className="flex justify-between gap-4">
                    <div className="w-1/3 pr-2">
                        <label htmlFor="busPlate" className="block text-md font-poppins font-medium text-gray-700">Bus Plate</label>
                        <input
                            type="text"
                            id="busPlate"
                            className="mt-2 block w-full border border-gray-300 text-sm font-poppins rounded-lg p-2"
                            placeholder="Enter Bus Plate"
                        />
                    </div>

                    <div className="w-1/3 px-2">
                        <label htmlFor="numSeats" className="block text-md font-poppins font-medium text-gray-700">No. of Seats</label>
                        <input
                            type="number"
                            id="numSeats"
                            min="1"
                            className="mt-2 block w-full border border-gray-300 text-sm font-poppins rounded-lg p-2"
                            placeholder="Enter Number of Seats"
                        />
                    </div>

                    <div className="w-1/3 pl-2">
                        <label className="block text-md font-poppins font-medium text-gray-700">Bus Type</label>
                        <div className="flex space-x-8 mt-2">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="seatOption"
                                    value="all"
                                    checked={selectedOption === 'all'}
                                    onChange={() => setSelectedOption('all')}
                                    className={`mr-2 font-poppins text-sm`}
                                />
                                <span className={`font-poppins text-sm`}>All</span>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="seatOption"
                                    value="2+1"
                                    checked={selectedOption === '2+1'}
                                    onChange={() => setSelectedOption('2+1')}
                                    className={`mr-2 font-poppins text-sm`}
                                />
                                <span className={`font-poppins text-sm`}>2+1</span>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="seatOption"
                                    value="2+2"
                                    checked={selectedOption === '2+2'}
                                    onChange={() => setSelectedOption('2+2')}
                                    className={`mr-2 font-poppins text-sm`}
                                />
                                <span className={`font-poppins text-sm`}>2+2</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between gap-4 mt-3">
                    <div className="w-1/3 pr-2">
                        <label htmlFor="driverName" className="block text-md font-poppins font-medium text-gray-700">Driver Name</label>
                        <input
                            type="text"
                            id="driverName"
                            value={driverName}
                            onChange={(e) => setDriverName(e.target.value)}
                            className="mt-2 block w-full border border-gray-300 text-sm font-poppins rounded-lg p-2"
                            placeholder="Enter Driver Name"
                        />
                    </div>

                    <div className="w-1/3 px-2">
                        <label htmlFor="contactNumber" className="block text-md font-poppins font-medium text-gray-700">Contact No.</label>
                        <input
                            type="text"
                            id="contactNumber"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            className="mt-2 block w-full border border-gray-300 text-sm font-poppins rounded-lg p-2"
                            placeholder="Enter Contact No."
                        />
                    </div>

                    <div className="w-1/3 pl-2">
                        <label className="block text-md font-poppins font-medium text-gray-700">Status</label>
                        <select
                            className="mt-2 block w-full border border-gray-300 text-sm font-poppins rounded-lg p-2"
                        >
                            {selectBoxOptions.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-5">
                <p className='text-gray-500'>
                    <span className='font-semibold text-secondary'>20 buses </span>found
                </p>

                <div className="flex justify-end">
                    <button
                        className="flex items-center justify-center h-10 px-4 text-sm font-medium font-poppins tracking-wide text-white transition duration-200 rounded-lg shadow-md bg-primary hover:bg-secondary"
                    >
                        <IoMdAdd className="mr-2 text-white text-base" />
                        New Bus
                    </button>
                </div>
            </div>

            <div className='mt-3 mx-auto'>
                <Table data={enhancedData} columns={columns} columnKeys={columnKeys} showActionColumn={true} actions={actionIcons}/>
            </div>
        </>
    );
};

export default BusTypes;