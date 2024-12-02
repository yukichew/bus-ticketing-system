import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiEdit, CiExport } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import Table from '../common/Table';
import Card from '../common/Card';
import { BusTypeStatus } from './BusTypeStatus';

const BusType = () => {
    const navigate = useNavigate();
    const [isNumSeatsOpen, setIsNumSeatsOpen] = useState(false);
    const [selectedNumSeatsOption, setSelectedNumSeatsOption] = useState('All');
    const [isBusTypeOpen, setIsBusTypeOpen] = useState(false);
    const [selectedBusTypeOption, setSelectedBusTypeOption] = useState('All');
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedStatusOption, setSelectedStatusOption] = useState('Select a status');
    const busTypeDropdownRef = useRef(null);
    const numSeatsDropdownRef = useRef(null);
    const statusDropdownRef = useRef(null);

    const handleNavigate = (screen) => {
        switch (screen) {
            case 'newBusType':
                navigate('/bo/bus/new-bus-type');
                break;
            case 'editBusType':
                navigate('/bo/bus/edit-bus-type');
                break;
            default:
                break;
        }
    };

    const [busTypeData, setBusTypeData] = useState([
        { id: "1", seats: '24', busType: 'Executive', status: 'Active' },
        { id: "2", seats: '27', busType: 'Executive (2+1)', status: 'Inactive' },
        { id: "3", seats: '30', busType: 'Executive', status: 'Inactive' },
        { id: "4", seats: '27', busType: 'Executive (2+1)', status: 'Active' }
    ]);    

    const columns = ['Bus Type', 'No. of Seats'];

    const columnKeys = ['busType', 'seats'];

    const busTypeOptions = ['All', 'Executive', 'Executive (2+1)'];

    const numSeatsOptions = ['All', '24', '27', '30'];

    const statusOptions = ['Active', 'Inactive'];

    const actionIcons = (row) => (
        <div className="flex justify-center space-x-2">
            <div className="relative group">
                <CiEdit 
                    className="text-gray-500 text-xl cursor-pointer" 
                    onClick={() => handleNavigate('editBusType')}
                />
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-11 w-16 font-poppins text-center text-sm text-white bg-slate-600 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-1 py-2">
                    Edit
                </div>
            </div>

            <div className="h-6 w-px bg-gray-300"></div>
            
            <div className="relative group">
                <AiOutlineDelete 
                    className="text-gray-500 text-xl cursor-pointer" 
                    onClick={() => handleDelete()}
                />
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-11 w-16 font-poppins text-center text-sm text-white bg-slate-600 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-1 py-2">
                    Delete
                </div>
            </div>
        </div>
    );

    const enhancedData = busTypeData.map((item, index) => ({
        ...item,
        status: (
            <BusTypeStatus
                status={item.status}
                onStatusChange={(newStatus) => handleStatusChange(newStatus, index)}
            />
        )
    }));

    const handleStatusChange = (newStatus, index) => {
        const updatedData = [...busTypeData];
        updatedData[index].status = newStatus;
        setBusTypeData(updatedData); 
    };
    
    const handleSelectNumSeats = (option) => {
        setSelectedNumSeatsOption(option);
        setIsNumSeatsOpen(false);
    };

    const handleSelectBusType = (option) => {
        setSelectedBusTypeOption(option);
        setIsBusTypeOpen(false);
    };

    const handleSelectStatus = (option) => {
        setSelectedStatusOption(option);
        setIsStatusOpen(false);
    };

    const handleDelete = () => {
        // delete logic
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (numSeatsDropdownRef.current && !numSeatsDropdownRef.current.contains(event.target)) {
                setIsNumSeatsOpen(false);
            }
            if (busTypeDropdownRef.current && !busTypeDropdownRef.current.contains(event.target)) {
                setIsBusTypeOpen(false);
            }
            if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
                setIsStatusOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className='mb-8 -mt-5'>
                <Card>
                    <div className="flex justify-between gap-4">
                        <div ref={busTypeDropdownRef} className="relative inline-block text-left w-1/3">
                            <label htmlFor="busType" className="block text-sm font-poppins font-medium text-gray-700">Bus Type</label>
                            <button
                                onClick={() => setIsBusTypeOpen(!isBusTypeOpen)}
                                className={`inline-flex justify-between w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 mt-2 bg-white text-sm font-poppins font-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary ${selectedBusTypeOption === 'All' ? 'text-gray-400' : 'text-black'}`}
                            >
                                {selectedBusTypeOption}
                                <RiArrowDropDownLine className="ml-2 h-5 w-5" />
                            </button>

                            {isBusTypeOpen && (
                                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
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

                        <div ref={numSeatsDropdownRef} className="relative inline-block text-left w-1/3">
                            <label htmlFor="numSeats" className="block text-sm font-poppins font-medium text-gray-700">No. of Seats</label>
                            <button
                                onClick={() => setIsNumSeatsOpen(!isNumSeatsOpen)}
                                className={`inline-flex justify-between w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 mt-2 bg-white text-sm font-poppins font-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary ${selectedBusTypeOption === 'All' ? 'text-gray-400' : 'text-black'}`}
                            >
                                {selectedNumSeatsOption}
                                <RiArrowDropDownLine className="ml-2 h-5 w-5" />
                            </button>

                            {isNumSeatsOpen && (
                                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                                    <ul className="max-h-56 rounded-md py-1 text-base font-poppins ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                        {numSeatsOptions.map((option, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleSelectNumSeats(option)}
                                                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                                            >
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div ref={statusDropdownRef} className="relative inline-block text-left w-1/3">
                            <label htmlFor="status" className="block text-sm font-poppins font-medium text-gray-700">Status</label>
                            <button
                                onClick={() => setIsStatusOpen(!isStatusOpen)}
                                className={`inline-flex justify-between w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 mt-2 bg-white text-sm font-poppins font-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary ${selectedStatusOption === 'Select a status' ? 'text-gray-400' : 'text-black'}`}
                            >
                                {selectedStatusOption}
                                <RiArrowDropDownLine className="ml-2 h-5 w-5" />
                            </button>

                            {isStatusOpen && (
                                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
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
                </Card>
            </div>

            <div className="flex justify-between items-center mt-7">
                <p className='text-gray-500'>
                    <span className='font-semibold text-secondary'>4 buses </span>found
                </p>

                <div className="flex justify-end">
                    <button className='ml-auto flex items-center font-medium hover:text-primary pr-1' onClick={() => handleNavigate('newBusType')}>
                        <IoIosAddCircleOutline size={16} />
                        <p className='mx-1'>New Bus Type</p>
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

export default BusType;