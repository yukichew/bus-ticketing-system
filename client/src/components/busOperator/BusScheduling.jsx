import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiEdit, CiSearch } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import { FaLongArrowAltRight } from "react-icons/fa";
import { RiArrowDropDownLine, RiHistoryLine } from "react-icons/ri";
import Table from '../common/Table';
import Card from '../common/Card';
import DatePickerField from '../common/DatePickerField';
import { getAllBusSchedulesByBusOperatorID, searchScheduleByBusOperatorID } from '../../api/schedule';
import { getAllLocations } from '../../api/location';
import { getOccupiedSeats } from '../../api/booking';
import moment from 'moment';

const BusScheduling = () => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const [busScheduleData, setBusScheduleData] = useState([]);
    const [isOriginOpen, setIsOriginOpen] = useState(false);
    const [selectedOriginOption, setSelectedOriginOption] = useState('Select an origin');
    const [isDestinationOpen, setIsDestinationOpen] = useState(false);
    const [selectedDestinationOption, setSelectedDestinationOption] = useState('Select a destination');
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedStatusOption, setSelectedStatusOption] = useState('Select a status');
    const [locationOptions, setLocationOptions] = useState([]);
    const [filters, setFilters] = useState({
        originState: '',
        destinationState: '',
        busPlate: '',
        travelDate: '',
        scheduleStatus: '',
    });
    const originDropdownRef = useRef(null);
    const destinationDropdownRef = useRef(null);
    const statusDropdownRef = useRef(null);

    const handleNavigate = (screen, busScheduleID) => {
        switch (screen) {
            case 'newSchedule':
                navigate(`/bo/bus/new-bus-schedule`);
                break;
            case 'editSchedule':
                navigate(`/bo/bus/edit-bus-schedule/${busScheduleID}`);
                break;
            case 'viewScheduleHistory':
                navigate(`/bo/bus/bus-schedule-history`);
                break;
            default:
                break;
        }
    };

    const fetchBusScheduleData = async () => {
        try {
            const results = await getAllBusSchedulesByBusOperatorID(token);

            if (Array.isArray(results) && results.length > 0) {
                const formattedData = await Promise.all(results.map(async (item) => {
                    const data = await getOccupiedSeats(item.busScheduleID);
                    const seatsSold = (Array.isArray(data) && !data.error) ? data.length : 0;
                    const seatsLeft = item.busInfo.busType.noOfSeats - seatsSold;

                    return {
                        busScheduleID: item.busScheduleID,
                        busPlate: item.busInfo.busPlate,
                        route: {
                            origin: item.routes.boardingLocation.state,
                            destination: item.routes.arrivalLocation.state,
                            originStation: item.routes.boardingLocation.name,
                            destinationStation: item.routes.arrivalLocation.name,
                            etd: item.etd,
                            eta: item.eta,
                            price: item.routes.price,
                        },
                        date: moment(item.travelDate).format('YYYY-MM-DD'),
                        totalSeats: item.busInfo.busType.noOfSeats,
                        seatsSold: seatsSold,
                        seatsLeft: seatsLeft >= 0 ? seatsLeft : 0,
                        status: item.scheduleStatus,
                    };
                }));
    
                
                setBusScheduleData(formattedData);
            } else {
                setBusScheduleData([]);
            }
        } catch (error) {
            setBusScheduleData([]);
        }
    };

    const fetchLocationData = async () => {
        const results = await getAllLocations();

        const formattedData = results.map((item) => ({
            locationID: item.locationID,
            stationName: item.name,
            state: item.state,
            status: item.status,
        }));

        const locationOptions = [...new Set(formattedData.map((item) => item.state))];

        setLocationOptions(locationOptions);
    };

    useEffect(() => {
        fetchBusScheduleData();
        fetchLocationData();
    }, []);

    const columns = ['Bus Plate', 'Route', 'Date', 'Price', 'Seats Availability'];

    const columnKeys = ['busPlate', 'route', 'date', 'price', 'seats'];

    const statusOptions = ['Scheduled', 'On Time', 'En Route', 'Delayed', 'Completed'];

    const statusStyles = {
        'Scheduled': 'text-blue-600 bg-blue-100',
        'On Time': 'text-orange-600 bg-orange-100',
        'En Route': 'text-yellow-600 bg-yellow-100',
        'Delayed': 'text-red-600 bg-red-100',
        'Completed': 'text-lime-700 bg-lime-100',
    };

    const handleSelectOrigin = (option) => {
        setSelectedOriginOption(option);
        setFilters((prevFilters) => ({
            ...prevFilters,
            originState: option === 'Select an origin' ? '' : option,
        }));
        setIsOriginOpen(false);
    };

    const handleSelectDestination = (option) => {
        setSelectedDestinationOption(option);
        setFilters((prevFilters) => ({
            ...prevFilters,
            destinationState: option === 'Select a destination' ? '' : option,
        }));
        setIsDestinationOpen(false);
    };

    const handleBusPlateChange = (e) => {
        const value = e.target.value;
        setFilters((prevFilters) => ({
            ...prevFilters,
            busPlate: value,
        }));
    };

    const handleSelectStatus = (option) => {
        setSelectedStatusOption(option);
        setFilters((prevFilters) => ({
            ...prevFilters,
            scheduleStatus: option === 'Select a status' ? '' : option,
        }));
        setIsStatusOpen(false);
    };

    const handleSearch = async () => {
        const activeFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== '')
        );

        try {
            const results = await searchScheduleByBusOperatorID(activeFilters, token);
    
            if (Array.isArray(results) && results.length > 0) {
                const formattedData = await Promise.all(results.map(async (item) => {
                    const data = await getOccupiedSeats(item.busScheduleID);
                    const seatsSold = (Array.isArray(data) && !data.error) ? data.length : 0;
                    const seatsLeft = item.busInfo.busType.noOfSeats - seatsSold;

                    return {
                        busScheduleID: item.busScheduleID,
                        busPlate: item.busInfo.busPlate,
                        route: {
                            origin: item.routes.boardingLocation.state,
                            destination: item.routes.arrivalLocation.state,
                            originStation: item.routes.boardingLocation.name,
                            destinationStation: item.routes.arrivalLocation.name,
                            etd: item.etd,
                            eta: item.eta,
                            price: item.routes.price,
                        },
                        date: moment(item.travelDate).format('YYYY-MM-DD'),
                        totalSeats: item.busInfo.busType.noOfSeats,
                        seatsSold: seatsSold,
                        seatsLeft: seatsLeft >= 0 ? seatsLeft : 0,
                        status: item.scheduleStatus,
                    };
                }));
    
                setBusScheduleData(formattedData);
            } else {
                setBusScheduleData([]);
            }
        } catch (error) {
            setBusScheduleData([]);
        }
    }

    const handleReset = () => {
        setFilters({
            originState: '',
            destinationState: '',
            busPlate: '',
            travelDate: '',
            scheduleStatus: '',
        });
        
        setSelectedOriginOption('Select an origin');
        setSelectedDestinationOption('Select a destination');
        setSelectedStatusOption('Select a status');

        fetchBusScheduleData();
    }

    const formatSeats = (seatsSold, seatsLeft) => {
        if (seatsSold === 0) {
            return <span className='font-poppins text-lime-600'> {seatsLeft} left</span>;
        }
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

    const enhancedData = busScheduleData.map((item, index) => ({
        ...item,
        busPlate: (
            <div className='w-20'>
                <span>{item.busPlate}</span>
            </div>
        ),
        seats: formatSeats(item.seatsSold, item.seatsLeft),
        route: (
            <div className="flex flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-left">
                        <span className="font-poppins font-semibold">{item.route.origin}</span>
                        <span className="font-poppins text-sm text-primary">{item.route.originStation}</span>
                    </div>
        
                    <FaLongArrowAltRight className="mx-2" />
        
                    <div className="flex flex-col items-left ml-2">
                        <span className="font-poppins font-semibold">{item.route.destination}</span>
                        <span className="font-poppins text-sm text-primary">{item.route.destinationStation}</span>
                    </div>
                </div>
        
                <div className="flex items-center mt-2">
                    <span className="font-poppins text-gray-400">{item.route.etd}</span>
                    <span className="font-poppins mx-2 text-gray-400">-</span>
                    <span className="font-poppins text-gray-400">{item.route.eta}</span>
                </div>
            </div>
        ),
        date: (
            <div className='w-24'>
                <span>{item.date}</span>
            </div>
        ),
        price:(
            <div className='w-20'>
                RM {item.route.price}
            </div>
        ),
        status: (
            <div className={`flex items-center justify-center relative w-40 h-8 ${statusStyles[item.status] || 'text-gray-600 bg-gray-100'} rounded-lg border-1 border-gray-50 shadow-md p-1 font-poppins font-medium text-sm`}>
                {item.status}
            </div>
        ),
    }));

    const actionIcons = (row) => (
        <div className="flex justify-center items-center space-x-2">
            <div className="relative group">
                <CiEdit 
                    className="text-gray-500 text-xl cursor-pointer"
                    onClick={() => handleNavigate('editSchedule', row.busScheduleID)}
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
                    <div className="mb-6 flex items-center justify-end gap-4 text-gray-700">
                        <div className="flex items-center gap-2 text-primary" onClick={handleSearch}>
                            <CiSearch />
                            <span className="font-poppins font-medium">Search</span>
                        </div>
                        <span className="text-gray-400">|</span>
                        <div className="flex items-center gap-2" onClick={handleReset}>
                            <GrPowerReset />
                            <span className="font-poppins font-medium">Reset</span>
                        </div>
                    </div>

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
                                        {locationOptions.map((option, index) => (
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
                                        {locationOptions.map((option, index) => (
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

                    <div className="flex justify-between gap-8 mt-3">
                        <div className="w-1/3 pr-2">
                            <label htmlFor="busPlate" className="block text-sm font-poppins font-medium text-gray-700">Bus Plate</label>
                            <input
                                type="text"
                                id="busPlate"
                                className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                                placeholder="Enter Bus Plate"
                                value={filters.busPlate}
                                onChange={handleBusPlateChange}
                            />
                        </div>

                        <div className="w-1/3 pr-2">
                            <label htmlFor="travelDate" className="block text-sm font-poppins font-medium text-gray-700">Date</label>
                            <DatePickerField
                                id="travelDate"
                                placeholder="Select a date"
                                className="mt-2 block w-full text-sm font-poppins rounded-lg p-1 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                                datePickerClassName="w-full h-7 px-4 focus:outline-none bg-white text-gray-700"
                                selectedDate={filters.travelDate ? new Date(filters.travelDate) : null}
                                setSelectedDate={(date) => {
                                    setFilters((prev) => ({
                                        ...prev,
                                        travelDate: date ? date.toISOString().split("T")[0] : "",
                                    }));
                                }}
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
                    <span className='font-semibold text-secondary'>{busScheduleData.length} schedules </span>created
                </p>
                <div className="flex justify-end items-center">
                    <button className='ml-auto flex items-center font-medium hover:text-primary pr-1' onClick={() => handleNavigate('newSchedule')}>
                        <IoIosAddCircleOutline size={16} />
                        <p className='mx-1'>New Schedule</p>
                    </button>

                    <div className="border-l-2 h-6 mx-4 border-gray-600"></div>

                    <button className='ml-auto flex items-center font-medium hover:text-primary pr-1' onClick={() => handleNavigate('viewScheduleHistory')}>
                        <RiHistoryLine size={16} />
                        <p className='mx-1'>Schedule History</p>
                    </button>
                </div>
            </div>

            {busScheduleData.length > 0 ? (
                <>
                    <div className='mt-3 mb-8 mx-auto'>
                        <Table data={enhancedData} columns={columns} columnKeys={columnKeys} showActionColumn={true} actions={actionIcons} />
                    </div>
                </>
            ) : (
                <div className="mt-3 text-center text-gray-500 font-poppins">
                    <span>No results found.</span>
                </div>
            )}
        </>
    );
}

export default BusScheduling;