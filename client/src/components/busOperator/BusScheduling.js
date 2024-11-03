import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircleOutline, IoIosBus } from "react-icons/io";
import { CiEdit, CiExport } from "react-icons/ci";
import { FaLongArrowAltRight } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import Table from '../common/Table';
import StatusBox from './StatusBox';
import Card from '../common/Card';
import { BusScheduleStatus } from './BusScheduleStatus';

const BusScheduling = () => {
    const navigate = useNavigate();
    const [isOriginOpen, setIsOriginOpen] = useState(false);
    const [selectedOriginOption, setSelectedOriginOption] = useState('Select an origin');
    const [isDestinationOpen, setIsDestinationOpen] = useState(false);
    const [selectedDestinationOption, setSelectedDestinationOption] = useState('Select a destination');
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedStatusOption, setSelectedStatusOption] = useState('Select a status');
    const originDropdownRef = useRef(null);
    const destinationDropdownRef = useRef(null);
    const statusDropdownRef = useRef(null);

    const handleNavigate = (screen) => {
        switch (screen) {
            case 'viewSchedule':
                navigate('/bo/bus/bus-schedule');
                break;
            case 'newSchedule':
                navigate('/bo/bus/new-bus-schedule');
                break;
            case 'editSchedule':
                navigate('/bo/bus/edit-bus-schedule');
                break;
            default:
                break;
        }
    };

    const [busData, setBusData] = useState([
        { 
            id: "1", 
            busPlate: "SMP5792", 
            route: { origin: "Kuala Lumpur", destination: "Penang", etd: "08:00", eta: "12:00" },
            totalSeats: 30,  
            seatsSold: 20,   
            seatsLeft: 10,   
            driver: 'John Doe', 
            status: 'Scheduled' 
        },
        { 
            id: "2", 
            busPlate: "SB8204H", 
            route: { origin: "Johor Bahru", destination: "Melaka", etd: "09:00", eta: "10:30" },
            totalSeats: 25,
            seatsSold: 15,
            seatsLeft: 10,
            driver: 'Jane Smith', 
            status: 'En Route' 
        },
        { 
            id: "3", 
            busPlate: "QPD1151", 
            route: { origin: "Kuantan", destination: "Ipoh", etd: "10:00", eta: "13:00" },
            totalSeats: 40,
            seatsSold: 32,
            seatsLeft: 8,
            driver: 'Emily Johnson', 
            status: 'Delayed' 
        },
        { 
            id: "4", 
            busPlate: "WXY2345", 
            route: { origin: "Kuala Lumpur", destination: "Penang", etd: "11:00", eta: "15:00" },
            totalSeats: 30,
            seatsSold: 28,
            seatsLeft: 2,
            driver: 'Michael Brown', 
            status: 'Canceled' 
        },
        { 
            id: "5", 
            busPlate: "TRG4786", 
            route: { origin: "Shah Alam", destination: "Klang", etd: "12:00", eta: "12:30" },
            totalSeats: 20,
            seatsSold: 12,
            seatsLeft: 8,
            driver: 'Sarah Davis', 
            status: 'Scheduled' 
        },
        { 
            id: "6", 
            busPlate: "LMN8765", 
            route: { origin: "Putrajaya", destination: "Melaka", etd: "07:30", eta: "09:30" },
            totalSeats: 35,
            seatsSold: 20,
            seatsLeft: 15,
            driver: 'Chris Wilson', 
            status: 'En Route' 
        },
        { 
            id: "7", 
            busPlate: "KJD2938", 
            route: { origin: "Alor Setar", destination: "Butterworth", etd: "08:15", eta: "09:45" },
            totalSeats: 50,
            seatsSold: 22,
            seatsLeft: 28,
            driver: 'Patricia Martinez', 
            status: 'Delayed' 
        },
        { 
            id: "8", 
            busPlate: "HFG5623", 
            route: { origin: "Kuala Lumpur", destination: "Kuantan", etd: "10:30", eta: "14:00" },
            totalSeats: 30,
            seatsSold: 30,
            seatsLeft: 0,
            driver: 'Daniel Garcia', 
            status: 'Canceled' 
        },
        { 
            id: "9", 
            busPlate: "NPQ1234", 
            route: { origin: "Penang", destination: "Johor Bahru", etd: "09:45", eta: "12:15" },
            totalSeats: 40,
            seatsSold: 30,
            seatsLeft: 10,
            driver: 'Jennifer Lee', 
            status: 'Scheduled' 
        },
        { 
            id: "10", 
            busPlate: "BND9821", 
            route: { origin: "Ipoh", destination: "Melaka", etd: "08:30", eta: "10:00" },
            totalSeats: 45,
            seatsSold: 25,
            seatsLeft: 20,
            driver: 'Robert Clark', 
            status: 'En Route' 
        }
    ]);  

    const columns = ['Bus Plate', 'Route', 'Seats Availability', 'Driver'];

    const columnKeys = ['busPlate', 'route', 'seats', 'driver'];

    const originOptions = ['Kuala Lumpur', 'Johor Bahru', 'Penang', 'Shah Alam', 'Putrajaya'];

    const destinationOptions = ['Melaka', 'Ipoh', 'Kuantan', 'Butterworth', 'Klang'];

    const statusOptions = ['Scheduled', 'On Time', 'En Route', 'Delayed', 'Postponed', 'Canceled'];

    const handleStatusChange = (newStatus, index) => {
        const updatedData = [...busData];
        updatedData[index].status = newStatus;
        setBusData(updatedData); 
    };

    const handleSelectOrigin = (option) => {
        setSelectedOriginOption(option);
        setIsOriginOpen(false);
    };

    const handleSelectDestination = (option) => {
        setSelectedDestinationOption(option);
        setIsDestinationOpen(false);
    };

    const handleSelectStatus = (option) => {
        setSelectedStatusOption(option);
        setIsStatusOpen(false);
    };

    const formatSeats = (seatsSold, seatsLeft) => {
        if (seatsLeft === 0) {
            return <span className='font-poppins text-gray-400 font-medium italic'>Sold Out</span>;
        }
        return (
            <div>
                <span className='font-poppins text-red-400'> {seatsSold} sold</span>, 
                <span className='font-poppins text-lime-600'> {seatsLeft} left</span>
            </div>
        );
    };

    const enhancedData = busData.map((item, index) => ({
        ...item,
        seats: formatSeats(item.seatsSold, item.seatsLeft),
        route: (
            <div className="flex flex-col">
                <div className="flex items-center">
                    <span className='font-poppins'>{item.route.origin}</span>
                    <FaLongArrowAltRight className="mx-2" />
                    <span className='font-poppins'>{item.route.destination}</span>
                </div>
                <div className="flex items-center">
                    <span className='font-poppins text-gray-400'>{item.route.etd}</span>
                    <span className='font-poppins mx-2 text-gray-400'>-</span>
                    <span className='font-poppins text-gray-400'>{item.route.eta}</span>
                </div>
            </div>
        ),
        status: (
            <BusScheduleStatus
                status={item.status}
                onStatusChange={(newStatus) => handleStatusChange(newStatus, index)} 
            />
        )
    }));

    const actionIcons = (row) => (
        <div className="flex justify-center items-center space-x-2">
            <div className="relative group">
                <IoIosBus 
                    className="text-gray-500 text-xl cursor-pointer"
                    onClick={() => handleNavigate('viewSchedule')}
                />
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-11 w-28 font-poppins text-center text-sm text-white bg-slate-600 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-1 py-2">
                    Bus Details
                </div>
            </div>
    
            <div className="h-4 w-px bg-gray-400" />
    
            <div className="relative group">
                <CiEdit 
                    className="text-gray-500 text-xl cursor-pointer"
                    onClick={() => handleNavigate('editSchedule')}
                />
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-11 w-16 font-poppins text-center text-sm text-white bg-slate-600 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-1 py-2">
                    Edit
                </div>
            </div>
        </div>
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (originDropdownRef.current && !originDropdownRef.current.contains(event.target)) {
                setIsOriginOpen(false);
            }
            if (destinationDropdownRef.current && !destinationDropdownRef.current.contains(event.target)) {
                setIsDestinationOpen(false);
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

    return(
        <>
            <div className='mb-8 -mt-5'>
                <Card>
                    <div className="flex items-center justify-between gap-4">
                        <div ref={originDropdownRef} className="relative inline-block text-left w-1/2">
                            <label htmlFor="origin" className="block text-sm font-poppins font-medium text-gray-700">Origin</label>
                            <button
                                onClick={() => setIsOriginOpen(!isOriginOpen)}
                                className={`inline-flex justify-between w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 mt-2 bg-white text-sm font-poppins font-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary ${selectedOriginOption === 'Select an origin' ? 'text-gray-400' : 'text-black'}`}
                            >
                                {selectedOriginOption}
                                <RiArrowDropDownLine className="ml-2 h-5 w-5" />
                            </button>

                            {isOriginOpen && (
                                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                                    <ul className="max-h-56 rounded-md py-1 text-base font-poppins ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                        {originOptions.map((option, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleSelectOrigin(option)}
                                                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                                            >
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-center w-auto mt-8">
                            <FaLongArrowAltRight className="text-xl text-gray-500" />
                        </div>

                        <div ref={destinationDropdownRef} className="relative inline-block text-left w-1/2">
                            <label htmlFor="destination" className="block text-sm font-poppins font-medium text-gray-700">Destination</label>
                            <button
                                onClick={() => setIsDestinationOpen(!isDestinationOpen)}
                                className={`inline-flex justify-between w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 mt-2 bg-white text-sm font-poppins font-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary ${selectedDestinationOption === 'Select a destination' ? 'text-gray-400' : 'text-black'}`}
                            >
                                {selectedDestinationOption}
                                <RiArrowDropDownLine className="ml-2 h-5 w-5" />
                            </button>

                            {isDestinationOpen && (
                                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                                    <ul className="max-h-56 rounded-md py-1 text-base font-poppins ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                        {destinationOptions.map((option, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleSelectDestination(option)}
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

                    <div className="flex justify-between gap-4 mt-3">
                        <div className="w-1/3 pr-2">
                            <label htmlFor="busPlate" className="block text-sm font-poppins font-medium text-gray-700">Bus Plate</label>
                            <input
                                type="text"
                                id="busPlate"
                                className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                                placeholder="Enter Bus Plate"
                            />
                        </div>

                        <div className="w-1/3 pr-2">
                            <label htmlFor="driverName" className="block text-sm font-poppins font-medium text-gray-700">Driver Name</label>
                            <input
                                type="text"
                                id="driverName"
                                className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                                placeholder="Enter Driver Name"
                            />
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

            <div className="flex justify-between items-center mt-5">
                <p className='text-gray-500'>
                    <span className='font-semibold text-secondary'>{busData.length} schedules </span>created
                </p>
                <div className="flex justify-end items-center">
                    <button className='ml-auto flex items-center font-medium hover:text-primary pr-1' onClick={() => handleNavigate('newSchedule')}>
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

            <div className='mt-3 mb-8 mx-auto'>
                <Table data={enhancedData} columns={columns} columnKeys={columnKeys} showActionColumn={true} actions={actionIcons}/>
            </div>
        </>
    );
}

export default BusScheduling;