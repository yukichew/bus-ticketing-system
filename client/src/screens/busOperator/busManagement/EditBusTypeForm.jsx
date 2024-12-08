import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/Footer';
import Card from '../../../components/common/Card';
import CustomButton from '../../../components/common/CustomButton';
import CustomInput from '../../../components/common/CustomInput';
import { getBusType, updateBusType } from '../../../api/busType';

const EditBusTypeForm = () => {
    const navigate = useNavigate();
    const { busTypeID } = useParams();
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedStatusOption, setSelectedStatusOption] = useState('Select a status');
    const [busTypeDetails, setBusTypeDetails] = useState({
        busTypeID: '',
        types: '',
        noOfSeats: '',
        status: '',
    });

    const fetchBusTypeData = async () => {
        const result = await getBusType(busTypeID);
        setBusTypeDetails(result);
        setSelectedStatusOption(result.status);
    };

    useEffect(() => {
        fetchBusTypeData();
    }, []);

    const statusOptions = ['Active', 'Inactive'];

    const handleSelectStatus = (option) => {
        setSelectedStatusOption(option);
        setBusTypeDetails({
            ...busTypeDetails,
            status: option,
        });
        setIsStatusOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBusTypeDetails({
            ...busTypeDetails,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        if (!busTypeDetails.types || !busTypeDetails.noOfSeats || selectedStatusOption === 'Select a status') {
            alert('Please fill out all fields.');
            return;
        }
        
        const updatedDetails = {
            busTypeID: busTypeDetails.busTypeID,
            noOfSeats: parseInt(busTypeDetails.noOfSeats),
            types: busTypeDetails.types,
            status: selectedStatusOption,
        };

        await updateBusType(busTypeID, updatedDetails);

        alert('Bus type updated successfully!');
        navigate('/bo/bus');
    };

    const handleCancel = () => {
        navigate('/bo/bus');
    };

    return (
        <>
            <Navbar />

            <div className="w-4/5 mt-8 mx-auto">
                <div className="flex items-center">
                    <h2 className="font-poppins font-bold text-2xl">Bus Management</h2>
                </div>

                <Card header="Bus Information">
                    <div>
                        <label htmlFor="types" className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                            Types
                        </label>
                        <CustomInput
                            id="types"
                            name="types"
                            placeholder="Enter Bus Type"
                            type="text"
                            required
                            value={busTypeDetails.types}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="noOfSeats" className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                            No. of Seats
                        </label>
                        <CustomInput
                            type="number"
                            id="noOfSeats"
                            name="noOfSeats"
                            min="1"
                            placeholder="Enter Number of Seats"
                            value={busTypeDetails.noOfSeats}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="w-full relative inline-block">
                        <label htmlFor="status" className="block text-sm font-poppins font-medium text-gray-700">
                            Status
                        </label>
                        <button
                            onClick={() => setIsStatusOpen(!isStatusOpen)}
                            className={`inline-flex justify-between items-center w-full h-12 rounded-md border border-gray-300 shadow-sm px-4 mt-2 bg-white text-sm font-poppins font-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${
                                selectedStatusOption === 'Select a status' ? 'text-gray-400' : 'text-black'
                            }`}
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
                </Card>

                <div className="mt-8 mb-10 flex justify-between">
                    <div className='w-28'>
                        <CustomButton title="Cancel" onClick={handleCancel} />
                    </div>
                    <div className='w-28'>
                        <CustomButton title="Save" onClick={handleSubmit} />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default EditBusTypeForm;