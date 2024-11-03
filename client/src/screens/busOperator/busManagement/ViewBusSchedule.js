import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineUsers } from "react-icons/hi2";
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/Footer';
import Card from '../../../components/common/Card';
import CustomButton from '../../../components/common/CustomButton';
import DatePickerField from '../../../components/common/DatePickerField';
import CustomInput from '../../../components/common/CustomInput';

const ViewBusSchedule = () => {
    const navigate = useNavigate();
    const [selectedDays, setSelectedDays] = useState([]);
    const [formData, setFormData] = useState({
        // bus information
        busPlate: 'AB1234CD',
        numSeats: '50',
        busTypes: '2+2',
        status: 'Active',
    
        // driver information
        fullname: 'John Doe',
        icNo: '123456-78-9012',
        contactNo: '+60123456789',
        licenseExpiryDate: '2025-12-31',
    
        // route information
        origin: 'Kuala Lumpur',
        boardingLocation: 'KL Sentral',
        etd: '2024-11-10T08:00:00Z',
        destination: 'Penang',
        arrivalLocation: 'Penang Sentral',
        eta: '2024-11-10T12:30:00Z',
    
        // recurring information
        recurringOption: 'Monthly',
        fromDate: '2024-11-01',
        toDate: '2024-12-31',
        days: 'Monday,Wednesday,Friday',
    });

    const daysOfWeek = [
        { label: 'M', fullDay: 'Monday' },
        { label: 'T', fullDay: 'Tuesday' },
        { label: 'W', fullDay: 'Wednesday' },
        { label: 'T', fullDay: 'Thursday' },
        { label: 'F', fullDay: 'Friday' },
        { label: 'S', fullDay: 'Saturday' },
        { label: 'S', fullDay: 'Sunday' }
    ];

    const handleNavigate = () => {
        navigate('/bo/bus/bus-schedule/passenger-lists');
    };

    return(
        <>
            <Navbar />

            <div className='w-4/5 mt-8 mb-8 mx-auto'>
                <div className='flex items-center'>
                    <h2 className='font-poppins font-bold text-2xl'>Bus Management</h2>
                </div>

                {/* bus & driver */}
                <div className='flex justify-between w-full gap-12'>
                    <div className='flex w-full gap-12'>
                        <div className='w-1/2'>
                            <Card header="Bus Information">
                                <div className="relative inline-block text-left w-full mt-2">
                                    <label htmlFor="busPlate" className="block text-sm font-poppins font-medium text-gray-700">Bus Plate</label>
                                    <div className="w-full h-12 p-2 rounded ring-1 ring-gray-300 bg-gray-50 font-poppins text-sm text-gray-700 mt-1 flex items-center">
                                        {formData.busPlate}
                                    </div>
                                </div>

                                <div className="relative inline-block text-left w-full mt-2">
                                    <label htmlFor="numSeats" className="block text-sm font-poppins font-medium text-gray-700">No. of Seats</label>
                                    <div className="w-full h-12 p-2 rounded ring-1 ring-gray-300 bg-gray-50 font-poppins text-sm text-gray-700 mt-1 flex items-center">
                                        {formData.numSeats}
                                    </div>
                                </div>

                                <div className="relative inline-block text-left w-full mt-2">
                                    <label htmlFor="busType" className="block text-sm font-poppins font-medium text-gray-700">Bus Type</label>
                                    <div className="w-full h-12 p-2 rounded ring-1 ring-gray-300 bg-gray-50 font-poppins text-sm text-gray-700 mt-1 flex items-center">
                                        {formData.busTypes}
                                    </div>
                                </div>

                                <div className="relative inline-block text-left w-full mt-2">
                                    <label htmlFor="busStatus" className="block text-sm font-poppins font-medium text-gray-700">Bus Status</label>
                                    <div className="w-full h-12 p-2 rounded ring-1 ring-gray-300 bg-gray-50 font-poppins text-sm text-gray-700 mt-1 flex items-center">
                                        {formData.status}
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div className='w-1/2'>
                            <Card header="Driver Information">
                                <div className="relative inline-block text-left w-full mt-2">
                                    <label htmlFor="fullname" className="block text-sm font-poppins font-medium text-gray-700">Full Name</label>
                                    <div className="w-full h-12 p-2 rounded ring-1 ring-gray-300 bg-gray-50 font-poppins text-sm text-gray-700 mt-1 flex items-center">
                                        {formData.fullname}
                                    </div>
                                </div>

                                <div className="relative inline-block text-left w-full mt-2">
                                    <label htmlFor="icNo" className="block text-sm font-poppins font-medium text-gray-700">IC Number</label>
                                    <div className="w-full h-12 p-2 rounded ring-1 ring-gray-300 bg-gray-50 font-poppins text-sm text-gray-700 mt-1 flex items-center">
                                        {formData.icNo}
                                    </div>
                                </div>

                                <div className="relative inline-block text-left w-full mt-2">
                                    <label htmlFor="contactNo" className="block text-sm font-poppins font-medium text-gray-700">Contact No.</label>
                                    <div className="w-full h-12 p-2 rounded ring-1 ring-gray-300 bg-gray-50 font-poppins text-sm text-gray-700 mt-1 flex items-center">
                                        {formData.contactNo}
                                    </div>
                                </div>

                                <div className="relative inline-block text-left w-full mt-2">
                                    <label htmlFor="licenseExpiryDate" className="block text-sm font-poppins font-medium text-gray-700">Driving License Expiry Date</label>
                                    <div className="w-full h-12 p-2 rounded ring-1 ring-gray-300 bg-gray-50 font-poppins text-sm text-gray-700 mt-1 flex items-center">
                                        {formData.licenseExpiryDate}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* route */}
                <div>
                    <Card header="Route Information">
                        <div className="flex items-center justify-between gap-4">
                            <div className="relative inline-block text-left w-1/3 mt-2">
                                <label htmlFor="origin" className="block text-sm font-poppins font-medium text-gray-700">Origin</label>
                                <div className="w-full h-12 p-2 rounded ring-1 ring-gray-300 bg-gray-50 font-poppins text-sm text-gray-700 mt-1 flex items-center">
                                    {formData.origin}
                                </div>
                            </div>
                            
                            <div className="relative inline-block text-left w-1/3 mt-2">
                                <label htmlFor="boardingLocation" className="block text-sm font-poppins font-medium text-gray-700">Boarding Location</label>
                                <div className="w-full h-12 p-2 rounded ring-1 ring-gray-300 bg-gray-50 font-poppins text-sm text-gray-700 mt-1 flex items-center">
                                    {formData.boardingLocation}
                                </div>
                            </div>

                            <div className="relative inline-block text-left w-1/3 mt-2">
                                <label htmlFor="etd" className="block text-sm font-poppins font-medium text-gray-700">ETD</label>
                                <div className="w-full h-12 p-2 rounded ring-1 ring-gray-300 bg-gray-50 font-poppins text-sm text-gray-700 mt-1 flex items-center">
                                    {formData.etd}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 mt-4">
                        <div className="relative inline-block text-left w-1/3 mt-2">
                                <label htmlFor="destination" className="block text-sm font-poppins font-medium text-gray-700">Destination</label>
                                <div className="w-full h-12 p-2 rounded ring-1 ring-gray-300 bg-gray-50 font-poppins text-sm text-gray-700 mt-1 flex items-center">
                                    {formData.destination}
                                </div>
                            </div>
                            
                            <div className="relative inline-block text-left w-1/3 mt-2">
                                <label htmlFor="arrivalLocation" className="block text-sm font-poppins font-medium text-gray-700">Arrival Location</label>
                                <div className="w-full h-12 p-2 rounded ring-1 ring-gray-300 bg-gray-50 font-poppins text-sm text-gray-700 mt-1 flex items-center">
                                    {formData.arrivalLocation}
                                </div>
                            </div>

                            <div className="relative inline-block text-left w-1/3 mt-2">
                                <label htmlFor="eta" className="block text-sm font-poppins font-medium text-gray-700">ETA</label>
                                <div className="w-full h-12 p-2 rounded ring-1 ring-gray-300 bg-gray-50 font-poppins text-sm text-gray-700 mt-1 flex items-center">
                                    {formData.eta}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* recurring */}
                <div>
                    <Card header="Recurring Options">
                        <div className="relative inline-block text-left w-full mt-2">
                            <label htmlFor="recurringOption" className="block text-sm font-poppins font-medium text-gray-700">Options</label>
                            <div className="w-full h-12 p-2 rounded ring-1 ring-gray-300 bg-gray-50 font-poppins text-sm text-gray-700 mt-1 flex items-center">
                                {formData.recurringOption}
                            </div>
                        </div>
                        

                        {formData.recurringOption === 'None' && (
                            <div className="mt-4">
                                <label htmlFor="date" className="block text-sm font-poppins font-medium text-gray-700">Bus Schedule Date</label>
                                <div className="w-full h-12 p-2 rounded ring-1 ring-gray-300 bg-gray-50 font-poppins text-sm text-gray-700 mt-1 flex items-center">
                                    {formData.fromDate}
                                </div>
                            </div>
                        )}

                        {(formData.recurringOption === 'Daily' || formData.recurringOption === 'Monthly') && (
                            <div className="mt-4">
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label htmlFor="fromDate" className="block text-sm font-poppins font-medium text-gray-700">From Date</label>
                                        <div className="w-full h-12 p-2 rounded ring-1 ring-gray-300 bg-gray-50 font-poppins text-sm text-gray-700 mt-1 flex items-center">
                                            {formData.fromDate}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <label htmlFor="toDate" className="block text-sm font-poppins font-medium text-gray-700">To Date</label>
                                        <div className="w-full h-12 p-2 rounded ring-1 ring-gray-300 bg-gray-50 font-poppins text-sm text-gray-700 mt-1 flex items-center">
                                            {formData.toDate}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {formData.recurringOption === 'Monthly' && (
                            <div className="mt-4">
                                <label className="block text-md font-poppins font-medium text-gray-700 mb-2">Select Days</label>
                                <div className="flex gap-4 mt-1">
                                    {daysOfWeek.map((day, index) => (
                                        <button
                                            key={index}
                                            // onClick={() => toggleDaySelection(day)}
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
                    <Card 
                        header="Seats Overview"
                        Icon={HiOutlineUsers}
                        onClick={handleNavigate}
                        tooltip='Passenger'
                    >

                    </Card>
                </div>
            </div>
            
            <Footer />
        </>
    );
}

export default ViewBusSchedule;