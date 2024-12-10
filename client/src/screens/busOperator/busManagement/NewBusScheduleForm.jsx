import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import Container from '../../../components/Container';
import Card from '../../../components/common/Card';
import CustomButton from '../../../components/common/CustomButton';
import DatePickerField from '../../../components/common/DatePickerField';
import CustomInput from '../../../components/common/CustomInput';
import { getAllBusByBusOperatorID } from '../../../api/busInfo';
import { getAllLocations } from '../../../api/location';
import { createBusSchedule } from '../../../api/schedule';

const NewBusScheduleForm = () => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const [busData, setBusData] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);
    const [stationOptions, setStationOptions] = useState([]);
    const [filteredStations, setFilteredStations] = useState([]);
    const [selectedBusPlateOption, setSelectedBusPlateOption] = useState('Select a bus plate');
    const [selectedOriginOption, setSelectedOriginOption] = useState('Select an origin');
    const [selectedDestinationOption, setSelectedDestinationOption] = useState('Select a destination');
    const [selectedBoardingStationOption, setSelectedBoardingStationOption] = useState('Select a boarding station');
    const [selectedArrivalStationOption, setSelectedArrivalStationOption] = useState('Select an arrival station');
    const [selectedRecurringOption, setSelectedRecurringOption] = useState('Select an option');
    const [isBusPlateOpen, setIsBusPlateOpen] = useState(false);
    const [isOriginOpen, setIsOriginOpen] = useState(false);
    const [isDestinationOpen, setIsDestinationOpen] = useState(false);
    const [isBoardingStationOpen, setIsBoardingStationOpen] = useState(false);
    const [isArrivalStationOpen, setIsArrivalStationOpen] = useState(false);
    const [isRecurringOptionOpen, setIsRecurringOptionOpen] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    const [formData, setFormData] = useState({
        // Schedule information
        etd: '',
        eta: '',
        scheduleStatus: 'Scheduled',
        status: 'Active',
        // Bus information
        busID: '',
        busPlate: '',
        numSeats: '',
        busType: '',
        busStatus: '',
        // Route information
        boardingLocationID: '',
        departureTime: '',
        arrivalLocationID: '',
        arrivalTime: '',
        routeStatus: 'Active',
        price: '',
        // Recurring information
        isRecurring: '',
        options: '',
        date: '',
        fromDate: '',
        toDate: '',
    });

    const fetchBusData = async () => {
        try {
            const results = await getAllBusByBusOperatorID(token);
            const busInfoArr = results?.busInfo || [];
            
            if (Array.isArray(busInfoArr) && busInfoArr.length > 0) {
                const formattedData = busInfoArr.map((item) => ({
                    busID: item.busID,
                    busPlate: item.busPlate,
                    busType: item.busType.types,
                    noOfSeats: `${item.busType.noOfSeats} seats`,
                    status: item.status,
                }));
        
                setBusData(formattedData);
            } else {
                setBusData([]);
            }
        } catch(error) {
            setBusData([]);
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
        setStationOptions(formattedData);
    };

    const filterStationsByState = (state) => {
        const filtered = stationOptions.filter((station) => station.state === state);
        setFilteredStations(filtered.map((station) => station.stationName));
    };

    const findLocationIDByStation = (stationName) => {
        const station = stationOptions.find((option) => option.stationName === stationName);
        return station ? station.locationID : null;
    };

    useEffect(() => {
        fetchBusData();
        fetchLocationData();
    }, []);

    const handleSelectBusPlate = (option) => {
        setSelectedBusPlateOption(option);
        setIsBusPlateOpen(false);
    
        const selectedBus = busData.find(bus => bus.busPlate === option);
    
        if (selectedBus) {
            setFormData({
                ...formData,
                busID: selectedBus.busID,
                busPlate: selectedBus.busPlate,
                numSeats: selectedBus.noOfSeats,
                busType: selectedBus.busType,
                busStatus: selectedBus.status,
            });
        } else {
            setFormData({
                ...formData,
                busPlate: '',
                numSeats: '',
                busType: '',
                busStatus: '',
            });
        }
    };

    const handleSelectOrigin = (state) => {
        setSelectedOriginOption(state);
        filterStationsByState(state);
        setIsOriginOpen(false);
    };

    const handleSelectBoardingStation = (stationName) => {
        const locationID = findLocationIDByStation(stationName);
        setSelectedBoardingStationOption(stationName);
        setFormData((prev) => ({ 
            ...prev, 
            boardingLocationID: locationID 
        }));
        setIsBoardingStationOpen(false);
    };

    const handleSelectDestination = (state) => {
        setSelectedDestinationOption(state);
        filterStationsByState(state);
        setIsDestinationOpen(false);
    };

    const handleSelectArrivalStation = (stationName) => {
        const locationID = findLocationIDByStation(stationName);
        setSelectedArrivalStationOption(stationName);
        setFormData((prev) => ({ 
            ...prev, 
            arrivalLocationID: locationID 
        }));
        setIsArrivalStationOpen(false);
    };
    
    const handleSelectRecurringOption = (option) => {
        const isRecurringValue = option === 'None' ? false : true;
    
        setFormData((prev) => ({
            ...prev,
            isRecurring: isRecurringValue,
            options: option,
            fromDate: '',
            toDate: '',
            selectDays: '',
        }));
    
        setSelectedRecurringOption(option);
        setIsRecurringOptionOpen(false);
        setFromDate('');
        setToDate('');
        setSelectedDays([]);
    };

    const toggleDaySelection = (day) => {
        const dayName = day.fullDay;
        if (selectedDays.includes(dayName)) {
            setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== dayName));
        } else {
            setSelectedDays([...selectedDays, dayName]);
        }
    };

    const handleSubmit = async () => {
        const formatTime = (time) => {
            const [hours, minutes] = time.split(':');
            return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
        };
    
        const formattedETD = formatTime(formData.etd);
        const formattedETA = formatTime(formData.eta);

        const scheduleDetails = {
            BusID: formData.busID,
            IsRecurring: formData.isRecurring,
            ETD: formattedETD,
            ETA: formattedETA,
            Routes: {
                BoardingLocationID: formData.boardingLocationID,
                DepartureTime: formattedETD,
                ArrivalLocationID: formData.arrivalLocationID,
                ArrivalTime: formattedETA,
                Status: formData.routeStatus,
                Price: parseFloat(formData.price),
            },
            RecurringOptions:
            formData.options === "None"
                ? {
                    Options: formData.options,
                    Date: formData.date,
                    Status: "Active",
                }
                : formData.options === "Daily"
                ? {
                    Options: formData.options,
                    FromDate: formData.fromDate,
                    ToDate: formData.toDate,
                    Status: "Active",
                }
                : formData.options === "Monthly"
                ? {
                    Options: formData.options,
                    FromDate: formData.fromDate,
                    ToDate: formData.toDate,
                    SelectDays: selectedDays,
                    Status: "Active",
                }
                : null,
            ScheduleStatus: "Scheduled",
            Status: "Active",
        };
    
        const response = await createBusSchedule(scheduleDetails, token);

        if (response) {
            alert("Schedule created successfully!");
            navigate('/bo/bus');
        } else {
            alert("Schedule created failed!");
        }
    };

    const recurringOptions = ['None', 'Daily', 'Monthly'];

    const daysOfWeek = [
        { label: 'M', fullDay: 'Monday' },
        { label: 'T', fullDay: 'Tuesday' },
        { label: 'W', fullDay: 'Wednesday' },
        { label: 'T', fullDay: 'Thursday' },
        { label: 'F', fullDay: 'Friday' },
        { label: 'S', fullDay: 'Saturday' },
        { label: 'S', fullDay: 'Sunday' }
    ];

    return(
        <>
            <Container>

            <div className='w-4/5 mt-8 mx-auto'>
                <div className='flex items-center'>
                    <h2 className='font-poppins font-bold text-2xl'>New Schedule</h2>
                </div>

                {/* bus */}
                <div>
                    <Card header="Bus Information">
                        <div className="relative inline-block text-left w-full mt-2">
                            <label htmlFor="busPlate" className="block text-sm font-poppins font-medium text-gray-700">Bus Plate</label>
                            <button
                                onClick={() => setIsBusPlateOpen(!isBusPlateOpen)}
                                className={`inline-flex justify-between items-center w-full h-12 rounded-md border border-gray-300 shadow-sm px-4 mt-2 bg-white text-sm font-poppins font-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${selectedBusPlateOption === 'Select a bus plate' ? 'text-gray-400' : 'text-black'}`}
                            >
                                {selectedBusPlateOption}
                                <RiArrowDropDownLine className="ml-2 h-5 w-5" />
                            </button>

                            {isBusPlateOpen && (
                                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                                    <ul className="max-h-56 rounded-md py-1 text-base font-poppins ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                        {busData.map((bus, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleSelectBusPlate(bus.busPlate)}
                                                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                                            >
                                                {bus.busPlate}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="numSeats" className="block text-sm font-poppins font-medium text-gray-700 mb-2">No. of Seats</label>
                            <CustomInput
                                id={'numSeats'}
                                name={'numSeats'}
                                placeholder={'Seats Number'}
                                value={formData.numSeats}
                                disabled={true}
                            />
                        </div>

                        <div className="relative inline-block text-left w-full">
                            <label htmlFor="busType" className="block text-sm font-poppins font-medium text-gray-700">Bus Type</label>
                            <CustomInput
                                id={'busType'}
                                name={'busType'}
                                placeholder={'Bus Type'}
                                value={formData.busType}
                                disabled={true}
                            />
                        </div>

                        <div className="relative inline-block text-left w-full">
                            <label htmlFor="busStatus" className="block text-sm font-poppins font-medium text-gray-700">Bus Status</label>
                            <CustomInput
                                id={'busStatus'}
                                name={'busStatus'}
                                placeholder={'Bus Status'}
                                value={formData.busStatus}
                                disabled={true}
                            />
                        </div>
                    </Card>
                </div>

                {/* route */}
                <div>
                    <Card header="Route Information">
                        <div className="flex items-center justify-between gap-4">
                            <div className="relative inline-block text-left w-1/3">
                                <label htmlFor="origin" className="block text-sm font-poppins font-medium text-gray-700">Origin</label>
                                <button
                                    onClick={() => setIsOriginOpen(!isOriginOpen)}
                                    className={`inline-flex justify-between items-center w-full h-12 rounded-md border border-gray-300 shadow-sm px-4 mt-2 bg-white text-sm font-poppins font-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${selectedOriginOption === 'Select an origin' ? 'text-gray-400' : 'text-black'}`}
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

                            <div className="relative inline-block text-left w-1/3">
                                <label htmlFor="boardingStation" className="block text-sm font-poppins font-medium text-gray-700">Boarding Station</label>
                                <button
                                    onClick={() => setIsBoardingStationOpen(!isBoardingStationOpen)}
                                    className={`inline-flex justify-between items-center w-full h-12 rounded-md border border-gray-300 shadow-sm px-4 mt-2 bg-white text-sm font-poppins font-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${selectedBoardingStationOption === 'Select a boarding station' ? 'text-gray-400' : 'text-black'}`}
                                >
                                    {selectedBoardingStationOption}
                                    <RiArrowDropDownLine className="ml-2 h-5 w-5" />
                                </button>
                                {isBoardingStationOpen && (
                                    <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                                        <ul className="max-h-56 rounded-md py-1 text-base font-poppins ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                            {filteredStations.map((option, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleSelectBoardingStation(option)}
                                                    className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                                                >
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="relative inline-block w-1/3">
                                <label htmlFor="etd" className="block text-sm font-poppins font-medium text-gray-700">ETD</label>
                                <CustomInput
                                    type="time"
                                    id="etd"
                                    value={formData.etd}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData((prev) => ({
                                            ...prev,
                                            etd: value,
                                            departureTime: value,
                                        }));
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 mt-2">
                            <div className="relative inline-block text-left w-1/3">
                                <label htmlFor="destination" className="block text-sm font-poppins font-medium text-gray-700">Destination</label>
                                <button
                                    onClick={() => setIsDestinationOpen(!isDestinationOpen)}
                                    className={`inline-flex justify-between items-center w-full h-12 rounded-md border border-gray-300 shadow-sm px-4 mt-2 bg-white text-sm font-poppins font-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${selectedDestinationOption === 'Select a destination' ? 'text-gray-400' : 'text-black'}`}
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

                            <div className="relative inline-block text-left w-1/3">
                                <label htmlFor="arrivalStation" className="block text-sm font-poppins font-medium text-gray-700">Arrival Station</label>
                                <button
                                    onClick={() => setIsArrivalStationOpen(!isArrivalStationOpen)}
                                    className={`inline-flex justify-between items-center w-full h-12 rounded-md border border-gray-300 shadow-sm px-4 mt-2 bg-white text-sm font-poppins font-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${selectedArrivalStationOption === 'Select an arrival station' ? 'text-gray-400' : 'text-black'}`}
                                >
                                    {selectedArrivalStationOption}
                                    <RiArrowDropDownLine className="ml-2 h-5 w-5" />
                                </button>
                                {isArrivalStationOpen && (
                                    <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                                        <ul className="max-h-56 rounded-md py-1 text-base font-poppins ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                            {filteredStations.map((option, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleSelectArrivalStation(option)}
                                                    className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                                                >
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="relative inline-block w-1/3">
                                <label htmlFor="eta" className="block text-sm font-poppins font-medium text-gray-700">ETA</label>
                                <CustomInput
                                    type="time"
                                    id="eta"
                                    value={formData.eta}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData((prev) => ({
                                            ...prev,
                                            eta: value,
                                            arrivalTime: value,
                                        }));
                                    }}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="relative inline-block text-left w-full mt-2">
                            <label htmlFor="price" className="block text-sm font-poppins font-medium text-gray-700">Price</label>
                            <CustomInput
                                type="text"
                                id="price"
                                placeholder="Enter Price"
                                value={formData.price}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setFormData((prev) => ({
                                        ...prev,
                                        price: value,
                                    }));
                                }}
                            />
                        </div>
                    </Card>
                </div>

                {/* recurring */}
                <div>
                    <Card header="Recurring Options">
                        <div className="relative inline-block text-left w-full mt-2">
                            <label htmlFor="recurringOption" className="block text-sm font-poppins font-medium text-gray-700">Options</label>
                            <button
                                onClick={() => setIsRecurringOptionOpen(!isRecurringOptionOpen)}
                                className={`inline-flex justify-between items-center w-full h-12 rounded-md border border-gray-300 shadow-sm px-4 mt-2 bg-white text-sm font-poppins font-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${selectedRecurringOption === 'Select an option' ? 'text-gray-400' : 'text-black'}`}
                            >
                                {selectedRecurringOption}
                                <RiArrowDropDownLine className="ml-2 h-5 w-5" />
                            </button>

                            {isRecurringOptionOpen && (
                                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                                    <ul className="max-h-56 rounded-md py-1 text-base font-poppins ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                        {recurringOptions.map((option, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleSelectRecurringOption(option)}
                                                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                                            >
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {selectedRecurringOption === 'None' && (
                            <div className="mt-4">
                                <label htmlFor="date" className="block text-sm font-poppins font-medium text-gray-700">Select Date</label>
                                <DatePickerField
                                    id="date"
                                    placeholder="Select a date"
                                    selectedDate={formData.date ? new Date(formData.date) : null}
                                    setSelectedDate={(date) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            date: date ? date.toISOString().split("T")[0] : "",
                                            fromDate: '',
                                            toDate: ''
                                        }));
                                    }}
                                />
                            </div>
                        )}

                        {(selectedRecurringOption === 'Daily' || selectedRecurringOption === 'Monthly') && (
                            <div className="mt-4">
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label htmlFor="fromDate" className="block text-sm font-poppins font-medium text-gray-700">From Date</label>
                                        <DatePickerField
                                            id='fromDate'
                                            placeholder='Select a date'
                                            selectedDate={formData.fromDate ? new Date(formData.fromDate) : null}
                                            setSelectedDate={(date) => {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    fromDate: date ? date.toISOString().split("T")[0] : "",
                                                    date: '',
                                                }));
                                            }}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label htmlFor="toDate" className="block text-sm font-poppins font-medium text-gray-700">To Date</label>
                                        <DatePickerField
                                            id='toDate'
                                            placeholder='Select a date'
                                            selectedDate={formData.toDate ? new Date(formData.toDate) : null}
                                            setSelectedDate={(date) => {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    toDate: date ? date.toISOString().split("T")[0] : "",
                                                    date: '',
                                                }));
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedRecurringOption === 'Monthly' && (
                            <div className="mt-4">
                                <label htmlFor="selectDays" className="block text-sm font-poppins font-medium text-gray-700">Select Days</label>
                                <div className="flex gap-4 mt-1">
                                    {daysOfWeek.map((day, index) => (
                                        <button
                                            key={index}
                                            onClick={() => toggleDaySelection(day)}
                                            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition duration-200 ease-in-out transform hover:scale-105 ${
                                                selectedDays.includes(day.fullDay)
                                                    ? 'bg-primary text-white ring-1 ring-offset-2 ring-primary font-semibold'
                                                    : 'border-gray-300 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {day.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Card>
                </div>

                <div className='mt-8 mb-10'>
                    <CustomButton title='Create' className='font-semibold' onClick={handleSubmit}/>
                </div>
            </div>

            </Container>
        </>
    );
}

export default NewBusScheduleForm;