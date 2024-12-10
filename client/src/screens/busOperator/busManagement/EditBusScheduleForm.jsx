import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi2";
import Container from '../../../components/Container';
import Card from '../../../components/common/Card';
import CustomButton from '../../../components/common/CustomButton';
import DatePickerField from '../../../components/common/DatePickerField';
import CustomInput from '../../../components/common/CustomInput';
import { getBusSchedule, updateBusSchedule } from '../../../api/schedule';
import { getAllBusByBusOperatorID } from '../../../api/busInfo';

const EditBusScheduleForm = () => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const { busScheduleID } = useParams();
    const [busData, setBusData] = useState([]);
    const [selectedBusPlateOption, setSelectedBusPlateOption] = useState('Select a bus plate');
    const [isBusPlateOpen, setIsBusPlateOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedStatusOption, setSelectedStatusOption] = useState('Select a status');
    const [isScheduleStatusOpen, setIsScheduleStatusOpen] = useState(false);
    const [selectedScheduleStatusOption, setSelectedScheduleStatusOption] = useState('Select a schedule status');
    const [selectedDays, setSelectedDays] = useState([]);
    const [formData, setFormData] = useState({
        // Schedule information
        busScheduleID: '',
        travelDate: '',
        etd: '',
        eta: '',
        scheduleStatus: '',
        status: '',
    
        // Bus information
        busID: '',
        busPlate: '',
        numSeats: '',
        busType: '',
        busStatus: '',
    
        // Route information
        origin: '',
        boardingLocationID: '',
        boardingStation: '',
        departureTime: '',
        destination: '',
        arrivalLocationID: '',
        arrivalStation: '',
        arrivalTime: '',
        routeStatus: '',
        price: '',
    
        // Recurring information
        isRecurring: '',
        recurringOptionID: '',
        options: '',
        date: '',
        fromDate: '',
        toDate: '',
        recurringStatus: '',
    });

    const fetchScheduleData = async () => {
        const results = await getBusSchedule(busScheduleID);
        
        setFormData({
            busScheduleID: results.busScheduleID,
            travelDate: results.travelDate,
            etd: results.etd,
            eta: results.eta,
            scheduleStatus: results.scheduleStatus,
            status: results.status,
            busID: results.busID,
            busPlate: results.busInfo.busPlate,
            numSeats: results.busInfo.busType.noOfSeats,
            busType: results.busInfo.busType.types,
            busStatus: results.busInfo.status,
            origin: results.routes.boardingLocation.state,
            boardingLocationID: results.routes.boardingLocationID,
            boardingStation: results.routes.boardingLocation.name,
            departureTime: results.routes.departureTime,
            arrivalLocationID: results.routes.arrivalLocationID,
            destination: results.routes.arrivalLocation.state,
            arrivalStation: results.routes.arrivalLocation.name,
            arrivalTime: results.routes.arrivalTime,
            routeStatus: results.routes.status,
            price: results.routes.price,
            isRecurring: results.isRecurring,
            recurringOptionID: results.recurringOptionID,
            options: results.recurringOptions.options,
            date: results.recurringOptions.date,
            fromDate: results.recurringOptions.fromDate,
            toDate: results.recurringOptions.toDate,
            recurringStatus: results.recurringOptions.status,
        })

        const recurringOption = results.recurringOptions.options;
        if(recurringOption == "Monthly"){
            const fetchedSelectDays = results.recurringOptions.selectDays;
            setSelectedDays(fetchedSelectDays);
        }
        setSelectedBusPlateOption(results.busInfo.busPlate);
        setSelectedScheduleStatusOption(results.scheduleStatus);
        setSelectedStatusOption(results.status);
    };

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

    useEffect(() => {
        fetchScheduleData();
        fetchBusData();
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

    const handleNavigate = () => {
        navigate('/bo/bus/bus-schedule/passenger-lists');
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
            TravelDate: formData.travelDate,
            ETD: formattedETD,
            ETA: formattedETA,
            Routes: {
                BoardingLocationID: formData.boardingLocationID,
                DepartureTime: formData.departureTime,
                ArrivalLocationID: formData.arrivalLocationID,
                ArrivalTime: formData.arrivalTime,
                Status: formData.routeStatus,
                Price: parseFloat(formData.price),
            },
            RecurringOptions: {
                Options: formData.options,
                FromDate: formData.fromDate,
                ToDate: formData.toDate,
                SelectDays: formData.selectDays,
                Status: formData.recurringStatus,
            },
            ScheduleStatus: formData.scheduleStatus,
            Status: formData.status,
        };

        const response = await updateBusSchedule(busScheduleID, scheduleDetails, token);

        if (response) {
            alert("Schedule updated successfully!");
            navigate('/bo/bus');
        } else {
            alert("Schedule updated failed!");
        }
    };
    
    const handleCancel = () => {
        navigate('/bo/bus');
    };

    const handleSelectStatus = (option) => {
        setSelectedStatusOption(option);
        setFormData((prevData) => ({
            ...prevData,
            status: option
        }));
        setIsStatusOpen(false);
    };

    const handleSelectScheduleStatus = (option) => {
        setSelectedScheduleStatusOption(option);
        setFormData((prevData) => ({
            ...prevData,
            scheduleStatus: option
        }));
        setIsScheduleStatusOpen(false);
    };
    
    const statusOptions = ['Active', 'Inactive'];

    const scheduleStatusOptions = ['Scheduled', 'On Time', 'En Route', 'Delayed', 'Completed'];

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
                <div className='flex items-center justify-between'>
                    <h2 className='font-poppins font-bold text-2xl'>Edit Schedule</h2>
                    <button className='ml-auto flex items-center font-medium hover:text-primary pr-1' onClick={handleNavigate}>
                        <HiOutlineUsers size={20} />
                        <p className='ml-2 text-lg'>Passenger List</p>
                    </button>
                </div>

                {/* schedule */}
                <div>
                    <Card header="Schedule Information">
                        <div className="flex items-center justify-between gap-4">
                            <div className="relative inline-block text-left w-1/3">
                                <label htmlFor="travelDate" className="block text-sm font-poppins font-medium text-gray-700">Travel Date</label>
                                <DatePickerField
                                    id="date"
                                    placeholder="Select a date"
                                    selectedDate={formData.travelDate ? new Date(formData.travelDate) : null}
                                    setSelectedDate={(date) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            travelDate: date ? date.toISOString().split("T")[0] : "",
                                        }));
                                    }}
                                />
                            </div>

                            <div className="relative inline-block text-left w-1/3">
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
                                        }));
                                    }}
                                    required
                                />
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
                                        }));
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <div className="relative inline-block text-left w-1/2">
                                <label htmlFor="scheduleStatus" className="block text-sm font-poppins font-medium text-gray-700">Schedule Status</label>
                                <button
                                    onClick={() => setIsScheduleStatusOpen(!isScheduleStatusOpen)}
                                    className={`inline-flex justify-between items-center w-full h-12 rounded-md border border-gray-300 shadow-sm px-4 mt-2 bg-white text-sm font-poppins font-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${selectedScheduleStatusOption === 'Select a schedule status' ? 'text-gray-400' : 'text-black'}`}
                                >
                                    {selectedScheduleStatusOption}
                                    <RiArrowDropDownLine className="ml-2 h-5 w-5" />
                                </button>

                                {isScheduleStatusOpen && (
                                    <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                                        <ul className="max-h-56 rounded-md py-1 text-base font-poppins ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                            {scheduleStatusOptions.map((option, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleSelectScheduleStatus(option)}
                                                    className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                                                >
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="relative inline-block text-left w-1/2">
                                <label htmlFor="status" className="block text-sm font-poppins font-medium text-gray-700">Status</label>
                                <button
                                    onClick={() => setIsStatusOpen(!isStatusOpen)}
                                    className={`inline-flex justify-between items-center w-full h-12 rounded-md border border-gray-300 shadow-sm px-4 mt-2 bg-white text-sm font-poppins font-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${selectedStatusOption === 'Select a status' ? 'text-gray-400' : 'text-black'}`}
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
                                <CustomInput
                                    id={'origin'}
                                    name={'origin'}
                                    placeholder={'Origin'}
                                    value={formData.origin}
                                    disabled={true}
                                />
                            </div>

                            <div className="relative inline-block text-left w-1/3">
                                <label htmlFor="boardingStation" className="block text-sm font-poppins font-medium text-gray-700">Boarding Station</label>
                                <CustomInput
                                    id={'boardingStation'}
                                    name={'boardingStation'}
                                    placeholder={'Boarding Station'}
                                    value={formData.boardingStation}
                                    disabled={true}
                                />
                            </div>

                            <div className="relative inline-block w-1/3">
                                <label htmlFor="departureTime" className="block text-sm font-poppins font-medium text-gray-700">Departure Time</label>
                                <CustomInput
                                    id={'departureTime'}
                                    name={'departureTime'}
                                    placeholder={'Departure Time'}
                                    value={formData.departureTime}
                                    disabled={true}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 mt-2">
                            <div className="relative inline-block text-left w-1/3">
                                <label htmlFor="destination" className="block text-sm font-poppins font-medium text-gray-700">Destination</label>
                                <CustomInput
                                    id={'destination'}
                                    name={'destination'}
                                    placeholder={'Destination'}
                                    value={formData.destination}
                                    disabled={true}
                                />
                            </div>

                            <div className="relative inline-block text-left w-1/3">
                                <label htmlFor="arrivalStation" className="block text-sm font-poppins font-medium text-gray-700">Arrival Station</label>
                                <CustomInput
                                    id={'arrivalStation'}
                                    name={'arrivalStation'}
                                    placeholder={'Arrival Station'}
                                    value={formData.arrivalStation}
                                    disabled={true}
                                />
                            </div>

                            <div className="relative inline-block w-1/3">
                                <label htmlFor="arrivalTime" className="block text-sm font-poppins font-medium text-gray-700">Arrival Time</label>
                                <CustomInput
                                    id={'arrivalTime'}
                                    name={'arrivalTime'}
                                    placeholder={'Arrival Time'}
                                    value={formData.arrivalTime}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        
                        <div className="relative inline-block text-left w-full mt-2">
                            <label htmlFor="price" className="block text-sm font-poppins font-medium text-gray-700">Price</label>
                            <CustomInput
                                id={'price'}
                                name={'price'}
                                placeholder={'Pricee'}
                                value={formData.price}
                                disabled={true}
                            />
                        </div>
                    </Card>
                </div>

                {/* recurring */}
                <div>
                    <Card header="Recurring Options">
                        <div className="relative inline-block text-left w-full mt-2">
                            <label htmlFor="recurringOption" className="block text-sm font-poppins font-medium text-gray-700">Options</label>
                            <CustomInput
                                id={'recurringOption'}
                                name={'recurringOption'}
                                placeholder={'Recurring Option'}
                                value={formData.options}
                                disabled={true}
                            />
                        </div>

                        {formData.options === 'None' && (
                            <div className="mt-4">
                                <label htmlFor="date" className="block text-sm font-poppins font-medium text-gray-700">Select Date</label>
                                <CustomInput
                                    id={'date'}
                                    name={'date'}
                                    placeholder={'Date'}
                                    value={formData.date}
                                    disabled={true}
                                />
                            </div>
                        )}

                        {(formData.options === 'Daily' || formData.options === 'Monthly') && (
                            <div className="mt-4">
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label htmlFor="fromDate" className="block text-sm font-poppins font-medium text-gray-700">From Date</label>
                                        <CustomInput
                                            id={'fromDate'}
                                            name={'fromDate'}
                                            placeholder={'From Date'}
                                            value={formData.fromDate}
                                            disabled={true}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label htmlFor="toDate" className="block text-sm font-poppins font-medium text-gray-700">To Date</label>
                                        <CustomInput
                                            id={'toDate'}
                                            name={'toDate'}
                                            placeholder={'To Date'}
                                            value={formData.toDate}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {formData.options === 'Monthly' && (
                            <div className="mt-4">
                                <label htmlFor="selectDays" className="block text-sm font-poppins font-medium text-gray-700">Select Days</label>
                                <div className="flex gap-4 mt-1">
                                    {daysOfWeek.map((day, index) => (
                                        <button
                                            key={index}
                                            disabled
                                            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                                                selectedDays.includes(day.fullDay)
                                                    ? 'bg-primary text-white ring-1 ring-offset-2 ring-primary font-semibold'
                                                    : 'border-gray-300 text-gray-700'
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
                
                <div className='mt-8 mb-10 flex justify-between'>
                    <div className='w-28'>
                        <CustomButton title="Cancel" onClick={handleCancel} />
                    </div>
                    <div className='w-28'>
                        <CustomButton title="Save" onClick={handleSubmit} />
                    </div>
                </div>
            </div>

            </Container>
        </>
    );
}

export default EditBusScheduleForm;