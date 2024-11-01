import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaLongArrowAltRight } from "react-icons/fa";
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/Footer';
import Card from '../../../components/common/Card';
import CustomButton from '../../../components/common/CustomButton';
import Breadcrumb from '../../../components/common/Breadcrumb';
import DatePickerField from '../../../components/common/DatePickerField';
import CustomInput from '../../../components/common/CustomInput';

const EditBusScheduleForm = () => {
    const navigate = useNavigate();
    const { bus_id } = useParams();
    const [isBusTypeOpen, setIsBusTypeOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedStatusOption, setSelectedStatusOption] = useState('Select Status');
    const [isBusPlateOpen, setIsBusPlateOpen] = useState(false);
    const [selectedBusPlateOption, setSelectedBusPlateOption] = useState('Select Bus Plate');
    const [isBusStatusOpen, setIsBusStatusOpen] = useState(false);
    const [isOriginOpen, setIsOriginOpen] = useState(false);
    const [selectedOriginOption, setSelectedOriginOption] = useState('Select an origin');
    const [isDestinationOpen, setIsDestinationOpen] = useState(false);
    const [selectedDestinationOption, setSelectedDestinationOption] = useState('Select an destination');
    const [isRecurringOptionOpen, setIsRecurringOptionOpen] = useState(false);
    const [selectedRecurringOption, setSelectedRecurringOption] = useState('None');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    const [formData, setFormData] = useState({
        // bus information
        busPlate: '',
        numSeats: '',
        busTypes: '',
        status: '',

        // driver information
        fullname: '',
        icNo: '',
        contactNo: '',
        licenseExpiryDate: '',

        // route information
        origin: '',
        etd: '',
        destination: '',
        eta: '',

        // recurring information
        recurringOption: '',
        from: '',
        to: '',
        days: '',
    });

    

    const handleCancel = () => {
        setFormData({
            busPlate: '',
            numSeats: '',
            busTypes: '',
            status: '',
            fullname: '',
            icNo: '',
            contactNo: '',
            licenseExpiryDate: '',
            origin: '',
            etd: '',
            destination: '',
            eta: '',
            recurringOption: '',
            from: '',
            to: '',
            days: '',
        });
    };

    const breadcrumbItems = [
        { name: 'Bus Scheduling', link: '/bo/bus?tab=Bus Scheduling' },
        { name: 'Edit Bus Scheduling' }
    ];

    const busTypeOptions = ['2+1', '2+2'];

    const busStatusOptions = ['Active', 'Inactive'];

    const originOptions = ['Kuala Lumpur', 'Johor Bahru', 'Penang', 'Shah Alam', 'Putrajaya'];

    const destinationOptions = ['Melaka', 'Ipoh', 'Kuantan', 'Butterworth', 'Klang'];

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

    const [busData, setBusData] = useState([
        { id: "1", busPlate: "SMP5792", seats: '30', busType: '2+1', status: 'Active' },
        { id: "2", busPlate: "SB8204H", seats: '40', busType: '2+1', status: 'Inactive' },
        { id: "3", busPlate: "QPD1151", seats: '56', busType: '2+2', status: 'Inactive' },
        { id: "4", busPlate: "WXY2345", seats: '45', busType: '2+1', status: 'Active' }
    ]);

    const handleSelectBusPlate = (option) => {
        setSelectedBusPlateOption(option);
        setIsBusPlateOpen(false);

        const selectedBus = busData.find(bus => bus.busPlate === option);

        if (selectedBus) {
            setFormData({
                busPlate: selectedBus.busPlate,
                numSeats: selectedBus.seats,
                busTypes: selectedBus.busType,
                status: selectedBus.status
            });
        } else {
            // display toast error message
        }
    };

    const handleSelectBusType = (option) => {
        setFormData((prevData) => ({
            ...prevData,
            busTypes: option
        }));
        setIsBusTypeOpen(false);
    };

    const handleSelectBusStatus = (option) => {
        setFormData((prevData) => ({
            ...prevData,
            status: option
        }));
        setIsBusStatusOpen(false);
    };

    const handleSelectOrigin = (option) => {
        setSelectedOriginOption(option);
        setIsOriginOpen(false);
    };

    const handleSelectDestination = (option) => {
        setSelectedDestinationOption(option);
        setIsDestinationOpen(false);
    };

    const handleSelectRecurringOption = (option) => {
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

    const handleSelectStatus = (option) => {
        setSelectedStatusOption(option);
        setIsStatusOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };
    
    return(
        <>
            <Navbar />

            <div className='w-4/5 mt-8 mx-auto'>
                <div className='flex items-center'>
                    <h2 className='font-poppins font-bold text-2xl'>Bus Management</h2>
                </div>

                <div className='mt-4'>
                    <Breadcrumb items={breadcrumbItems} />
                </div>

                {/* bus & driver */}
                <div className='flex justify-between w-full gap-12'>
                    <div className='flex w-full gap-12'>
                        <div className='w-1/2'>
                            <Card header="Bus Information">
                                <div className="relative inline-block text-left w-full mt-2">
                                    <label htmlFor="busPlate" className="block text-md font-poppins font-medium text-gray-700">Bus Plate</label>
                                    <button
                                        onClick={() => setIsBusPlateOpen(!isBusPlateOpen)}
                                        className="inline-flex justify-between items-center w-full h-12 rounded-md border border-gray-300 shadow-sm px-4 mt-2 bg-white text-sm font-poppins font-small text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
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
                                    <label htmlFor="numSeats" className="block text-md font-poppins font-medium text-gray-700 mb-2">No. of Seats</label>
                                    <CustomInput
                                        id={'numSeats'}
                                        name={'numSeats'}
                                        placeholder={'Seats Number'}
                                        type={'number'}
                                        required
                                        value={formData.numSeats}
                                    />
                                </div>

                                <div className="relative inline-block text-left w-full">
                                    <label htmlFor="busType" className="block text-md font-poppins font-medium text-gray-700">Bus Type</label>
                                    <button
                                        onClick={() => setIsBusTypeOpen(!isBusTypeOpen)}
                                        className="inline-flex justify-between items-center w-full h-12 rounded-md border border-gray-300 shadow-sm px-4 mt-2 bg-white text-sm font-poppins font-small text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                    >
                                        {formData.busTypes || 'Select Bus Type'}
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

                                <div className="relative inline-block text-left w-full">
                                    <label htmlFor="status" className="block text-md font-poppins font-medium text-gray-700">Bus Status</label>
                                    <button
                                        onClick={() => setIsBusStatusOpen(!isBusStatusOpen)}
                                        className="inline-flex justify-between items-center w-full h-12 rounded-md border border-gray-300 shadow-sm px-4 mt-2 bg-white text-sm font-poppins font-small text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                    >
                                        {formData.status || 'Select Bus Status'}
                                        <RiArrowDropDownLine className="ml-2 h-5 w-5" />
                                    </button>

                                    {isBusStatusOpen && (
                                        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                                            <ul className="max-h-56 rounded-md py-1 text-base font-poppins ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                {busStatusOptions.map((option, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => handleSelectBusStatus(option)}
                                                        className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                                                    >
                                                        {option}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>

                        <div className='w-1/2'>
                            <Card header="Driver Information">
                                <div className='mt-2'>
                                    <label htmlFor="fullname" className="block text-md font-poppins font-medium text-gray-700 mb-2">Full Name</label>
                                    <CustomInput
                                        id={'fullname'}
                                        name={'fullname'}
                                        placeholder={'Full Name'}
                                        type={'text'}
                                        required
                                        value={formData.fullname}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="icNo" className="block text-md font-poppins font-medium text-gray-700 mb-2">IC Number</label>
                                    <CustomInput
                                        id={'icNo'}
                                        name={'icNo'}
                                        placeholder={'IC Number (E.g. xxxxxx-xx-xxxx)'}
                                        type={'text'}
                                        required
                                        value={formData.icNo}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contactNo" className="block text-md font-poppins font-medium text-gray-700 mb-2">Contact No.</label>
                                    <CustomInput
                                        id={'contactNo'}
                                        name={'contactNo'}
                                        placeholder={'Contact No.'}
                                        type={'text'}
                                        required
                                        value={formData.contactNo}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="licenseExpiryDate" className="block text-md font-poppins font-medium text-gray-700 mb-2">Driving License Expiry Date</label>
                                    <DatePickerField
                                        id={'licenseExpiryDate'}
                                        name={'licenseExpiryDate'}
                                        placeholder={'Select License Expiry Date'}
                                        required
                                    />
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* route */}
                <div>
                    <Card header="Route Information">
                        <div className="flex items-center justify-between gap-4">
                            {/* Origin */}
                            <div className="relative inline-block text-left w-1/4">
                                <label htmlFor="origin" className="block text-md font-poppins font-medium text-gray-700">Origin</label>
                                <button
                                    onClick={() => setIsOriginOpen(!isOriginOpen)}
                                    className="inline-flex justify-between items-center w-full h-12 rounded-md border border-gray-300 shadow-sm px-4 mt-1 bg-white text-sm font-poppins font-small text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
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

                            {/* ETD */}
                            <div className="relative inline-block w-1/4">
                                <label htmlFor="etd" className="block text-md font-poppins font-medium text-gray-700 mb-1">ETD</label>
                                <CustomInput
                                    type="time"
                                    id="etd"
                                    required
                                />
                            </div>

                            {/* Arrow */}
                            <div className="flex items-center justify-center w-auto mt-8">
                                <FaLongArrowAltRight className="text-xl text-gray-500" />
                            </div>

                            {/* Destination */}
                            <div className="relative inline-block text-left w-1/4">
                                <label htmlFor="destination" className="block text-md font-poppins font-medium text-gray-700">Destination</label>
                                <button
                                    onClick={() => setIsDestinationOpen(!isDestinationOpen)}
                                    className="inline-flex justify-between items-center w-full h-12 rounded-md border border-gray-300 shadow-sm px-4 mt-1 bg-white text-sm font-poppins font-small text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
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

                            {/* ETA */}
                            <div className="relative inline-block w-1/4">
                                <label htmlFor="eta" className="block text-md font-poppins font-medium text-gray-700 mb-1">ETA</label>
                                <CustomInput
                                    type="time"
                                    id="eta"
                                    required
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* recurring */}
                <div>
                    <Card header="Recurring Options">
                        <div className="relative inline-block text-left w-full mt-2">
                            <label htmlFor="recurringOption" className="block text-md font-poppins font-medium text-gray-700">Options</label>
                            <button
                                onClick={() => setIsRecurringOptionOpen(!isRecurringOptionOpen)}
                                className="inline-flex justify-between items-center w-full h-12 rounded-md border border-gray-300 shadow-sm px-4 mt-1 bg-white text-sm font-poppins font-small text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
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
                                <label htmlFor="date" className="block text-md font-poppins font-medium text-gray-700">Select Date</label>
                                <DatePickerField
                                    id={'date'}
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    className="mt-1 block w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        )}

                        {(selectedRecurringOption === 'Daily' || selectedRecurringOption === 'Monthly') && (
                            <div className="mt-4">
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label htmlFor="fromDate" className="block text-md font-poppins font-medium text-gray-700">From Date</label>
                                        <DatePickerField
                                            id={'fromDate'}
                                            type="date"
                                            value={fromDate}
                                            onChange={(e) => setFromDate(e.target.value)}
                                            className="mt-1 block w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label htmlFor="toDate" className="block text-md font-poppins font-medium text-gray-700">To Date</label>
                                        <DatePickerField
                                            id={'toDate'}
                                            type="date"
                                            value={toDate}
                                            onChange={(e) => setToDate(e.target.value)}
                                            className="mt-1 block w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedRecurringOption === 'Monthly' && (
                            <div className="mt-4">
                                <label className="block text-md font-poppins font-medium text-gray-700 mb-2">Select Days</label>
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

                {/* seats information */}
                <div>
                    <Card header="Seats Overview">

                    </Card>
                </div>
                
                <div className='mt-8 mb-10 flex justify-between'>
                    <CustomButton title='Cancel' className='w-24' onClick={handleCancel}/>
                    <CustomButton title='Save' className='w-24'/>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default EditBusScheduleForm;