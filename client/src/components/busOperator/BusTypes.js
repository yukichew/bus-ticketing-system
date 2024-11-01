import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiEdit, CiExport } from "react-icons/ci";
import Table from '../common/Table';
import StatusBox from './StatusBox';

const BusTypes = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('all');
    const [isBusTypeOpen, setIsBusTypeOpen] = useState(false);
    const [selectedBusTypeOption, setSelectedBusTypeOption] = useState('All');
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedStatusOption, setSelectedStatusOption] = useState('Active');

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
        { id: "1", busPlate: "SMP5792", seats: '30', busType: '2+1', status: 'Active' },
        { id: "2", busPlate: "SB8204H", seats: '40', busType: '2+1', status: 'Inactive' },
        { id: "3", busPlate: "QPD1151", seats: '56', busType: '2+2', status: 'Inactive' },
        { id: "4", busPlate: "WXY2345", seats: '45', busType: '2+1', status: 'Active' },
        { id: "5", busPlate: "TRG4786", seats: '32', busType: '2+2', status: 'Inactive' },
        { id: "6", busPlate: "LMN8765", seats: '50', busType: '2+2', status: 'Active' },
        { id: "7", busPlate: "KJD2938", seats: '25', busType: '2+1', status: 'Active' },
        { id: "8", busPlate: "HFG5623", seats: '60', busType: '2+2', status: 'Inactive' },
        { id: "9", busPlate: "NPQ1234", seats: '35', busType: '2+1', status: 'Active' },
        { id: "10", busPlate: "BND9821", seats: '55', busType: '2+2', status: 'Active' },
        { id: "11", busPlate: "CDE4455", seats: '48', busType: '2+1', status: 'Active' },
        { id: "12", busPlate: "VFR9832", seats: '40', busType: '2+2', status: 'Inactive' },
        { id: "13", busPlate: "LKJ0921", seats: '38', busType: '2+1', status: 'Active' },
        { id: "14", busPlate: "XYZ7654", seats: '50', busType: '2+1', status: 'Active' },
        { id: "15", busPlate: "FTH9843", seats: '42', busType: '2+2', status: 'Active' },
        { id: "16", busPlate: "JIK1298", seats: '46', busType: '2+2', status: 'Inactive' },
        { id: "17", busPlate: "GHF1290", seats: '52', busType: '2+1', status: 'Active' },
        { id: "18", busPlate: "PQR7563", seats: '30', busType: '2+2', status: 'Active' },
        { id: "19", busPlate: "ASD8732", seats: '28', busType: '2+1', status: 'Inactive' },
        { id: "20", busPlate: "QWE4321", seats: '62', busType: '2+2', status: 'Active' }
    ]);    

    const columns = ['Bus Plate', 'Bus Type', 'No. of Seats'];

    const columnKeys = ['busPlate', 'busType', 'seats'];

    const busTypeOptions = ['All', '2+1', '2+2'];

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

    const handleSelectBusType = (option) => {
        setSelectedBusTypeOption(option);
        setIsBusTypeOpen(false);
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
                    <div className="w-1/4 pr-2">
                        <label htmlFor="busPlate" className="block text-md font-poppins font-medium text-gray-700">Bus Plate</label>
                        <input
                            type="text"
                            id="busPlate"
                            className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                            placeholder="Enter Bus Plate"
                        />
                    </div>

                    <div className="w-1/4 pl-2 relative inline-block text-left">
                        <label htmlFor="busType" className="block text-md font-poppins font-medium text-gray-700">Bus Type</label>
                        <button
                            onClick={() => setIsBusTypeOpen(!isBusTypeOpen)}
                            className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 mt-2 bg-white text-sm font-poppins font-small text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                        >
                            {selectedBusTypeOption}
                            <RiArrowDropDownLine className="ml-2 h-5 w-5" />
                        </button>

                        {isBusTypeOpen && (
                            <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ">
                                <ul className="max-h-56 rounded-md py-1 text-base font-poppins ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    {busTypeOptions.map((option, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSelectBusType(option)}
                                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="w-1/4 px-2">
                        <label htmlFor="numSeats" className="block text-md font-poppins font-medium text-gray-700">No. of Seats</label>
                        <input
                            type="number"
                            id="numSeats"
                            min="1"
                            className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                            placeholder="Enter Number of Seats"
                        />
                    </div>

                    <div className="w-1/4 pl-2 relative inline-block text-left">
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
                                            onClick={() => handleSelectStatus(option)}
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