import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiEdit, CiExport } from "react-icons/ci";
import Table from '../common/Table';
import StatusBox from './StatusBox';

const BusTypes = () => {
    const [selectedOption, setSelectedOption] = useState('all');
    const [driverName, setDriverName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedStatusOption, setSelectedStatusOption] = useState('Active');
    const navigate = useNavigate();

    const handleNavigate = (screen) => {
        switch (screen) {
            case 'newBus':
                navigate('/bo/bus/new-bus-type');
                break;
            case 'editBus':
                navigate('/bo/bus/edit-bus-type');
                break;
            default:
                break;
        }
    };

    const [busData, setBusData] = useState([
        { id:"1", busPlate: "SMP5792", seats: '30', busType: '2+1', driver: 'John Doe', contactno: '123-456-7890', status: 'Available' },
        { id:"2", busPlate: "SB8204H", seats: '40', busType: '2+1', driver: 'Jane Smith', contactno: '234-567-8901', status: 'Pending' },
        { id:"3", busPlate: "QPD1151", seats: '56', busType: '2+2', driver: 'Emily Johnson', contactno: '345-678-9012', status: 'Not Available' },
        { id:"4", busPlate: "WXY2345", seats: '45', busType: '2+1', driver: 'Michael Brown', contactno: '456-789-0123', status: 'On Road' },
        { id:"5", busPlate: "TRG4786", seats: '32', busType: '2+2', driver: 'Sarah Davis', contactno: '567-890-1234', status: 'Not Available' },
        { id:"6", busPlate: "LMN8765", seats: '50', busType: '2+2', driver: 'Chris Wilson', contactno: '678-901-2345', status: 'Available' },
        { id:"7", busPlate: "KJD2938", seats: '25', busType: '2+1', driver: 'Patricia Martinez', contactno: '789-012-3456', status: 'Available' },
        { id:"8", busPlate: "HFG5623", seats: '60', busType: '2+2', driver: 'Daniel Garcia', contactno: '890-123-4567', status: 'Not Available' },
        { id:"9", busPlate: "NPQ1234", seats: '35', busType: '2+1', driver: 'Jennifer Lee', contactno: '901-234-5678', status: 'Available' },
        { id:"10", busPlate: "BND9821", seats: '55', busType: '2+2', driver: 'Robert Clark', contactno: '012-345-6789', status: 'Available' },
        { id:"11", busPlate: "CDE4455", seats: '48', busType: '2+1', driver: 'Linda Rodriguez', contactno: '123-456-7891', status: 'Available' },
        { id:"12", busPlate: "VFR9832", seats: '40', busType: '2+2', driver: 'David Lewis', contactno: '234-567-8902', status: 'Not Available' },
        { id:"13", busPlate: "LKJ0921", seats: '38', busType: '2+1', driver: 'Elizabeth Walker', contactno: '345-678-9013', status: 'Available' },
        { id:"14", busPlate: "XYZ7654", seats: '50', busType: '2+1', driver: 'James Hall', contactno: '456-789-0124', status: 'Available' },
        { id:"15", busPlate: "FTH9843", seats: '42', busType: '2+2', driver: 'Mary Allen', contactno: '567-890-1235', status: 'Available' },
        { id:"16", busPlate: "JIK1298", seats: '46', busType: '2+2', driver: 'Charles Young', contactno: '678-901-2346', status: 'Not Available' },
        { id:"17", busPlate: "GHF1290", seats: '52', busType: '2+1', driver: 'Susan King', contactno: '789-012-3457', status: 'Available' },
        { id:"18", busPlate: "PQR7563", seats: '30', busType: '2+2', driver: 'Mark Wright', contactno: '890-123-4568', status: 'Available' },
        { id:"19", busPlate: "ASD8732", seats: '28', busType: '2+1', driver: 'Jennifer Scott', contactno: '901-234-5679', status: 'Not Available' },
        { id:"20", busPlate: "QWE4321", seats: '62', busType: '2+2', driver: 'Christopher Green', contactno: '012-345-6780', status: 'Available' }
    ]);

    const columns = ['Bus Plate', 'Bus Type', 'No. of Seats', 'Driver', 'Contact No.', 'Status'];

    const columnKeys = ['busPlate', 'busType', 'seats', 'driver', 'contactno', 'status'];

    const statusOptions = ['Active', 'Inactive'];

    const actionIcons = (row) => (
        <div className="flex justify-center space-x-2">
            <div className="relative group">
                <CiEdit 
                    className="text-gray-500 text-xl cursor-pointer" 
                    onClick={() => handleNavigate('editBus')}
                />
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-11 w-16 font-poppins text-center text-sm text-white bg-slate-600 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-1 py-2">
                    Edit
                </div>
            </div>
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

    const handleSelectStatus = (option) => {
        setSelectedOption(option);
        setIsStatusOpen(false);
    };

    const selectBoxOptions = ['Available', 'Pending', 'Not Available', 'On Road'];

    return (
        <>
            <div className="border border-gray-100 rounded-lg p-4 bg-white shadow-md mt-3">
                <div className="flex justify-between gap-4">
                    <div className="w-1/3 pr-2">
                        <label htmlFor="busPlate" className="block text-md font-poppins font-medium text-gray-700">Bus Plate</label>
                        <input
                            type="text"
                            id="busPlate"
                            className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                            placeholder="Enter Bus Plate"
                        />
                    </div>

                    <div className="w-1/3 px-2">
                        <label htmlFor="numSeats" className="block text-md font-poppins font-medium text-gray-700">No. of Seats</label>
                        <input
                            type="number"
                            id="numSeats"
                            min="1"
                            className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
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
                            className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
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
                            className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                            placeholder="Enter Contact No."
                        />
                    </div>

                    <div className="w-1/3 pl-2 relative inline-block text-left">
                        <label htmlFor="status" className="block text-md font-poppins font-medium text-gray-700">Status</label>
                        <button
                            onClick={() => setIsStatusOpen(!isStatusOpen)}
                            className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 mt-2 bg-white text-sm font-poppins font-small text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                        >
                            {selectedStatusOption}
                            <RiArrowDropDownLine className="ml-2 h-5 w-5" />
                        </button>

                        {isStatusOpen && (
                            <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ">
                                <ul className="max-h-56 rounded-md py-1 text-base font-poppins ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    {statusOptions.map((option, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleStatusChange(option)}
                                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-7">
                <p className='text-gray-500'>
                    <span className='font-semibold text-secondary'>20 buses </span>found
                </p>

                <div className="flex justify-end">
                    <button className='ml-auto flex items-center font-medium hover:text-primary pr-1' onClick={() => handleNavigate('newBus')}>
                        <IoIosAddCircleOutline size={16} />
                        <p className='mx-1'>New Bus</p>
                    </button>

                    <span className="text-gray-400 mx-2">|</span>
                            
                    <button className='ml-auto flex items-center font-medium hover:text-primary pr-1'>
                        <CiExport size={16} />
                        <p className='mx-1'>Export</p>
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