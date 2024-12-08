import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/Footer';
import Card from '../../../components/common/Card';
import CustomButton from '../../../components/common/CustomButton';
import CustomInput from '../../../components/common/CustomInput';
import { createBus } from '../../../api/busInfo';
import { getAllBusType } from '../../../api/busType';

const NewBusForm = () => {
    const navigate = useNavigate();
    const [busTypeOptions, setBusTypeOptions] = useState([]);
    const [isBusTypeOpen, setIsBusTypeOpen] = useState(false);
    const [selectedBusTypeOption, setSelectedBusTypeOption] = useState('Select a bus type');
    const [isBusStatusOpen, setIsBusStatusOpen] = useState(false);
    const [selectedBusStatusOption, setSelectedBusStatusOption] = useState('Select a status');
    const [busDetails, setBusDetails] = useState({
        busPlate: '',
        busTypeID: '',
        status: '',
    });

    const fetchBusTypeData = async () => {
        const results = await getAllBusType();

        const formattedData = results.map((item) => ({
            busTypeID: item.busTypeID,
            typeWithSeats: `${item.types}, ${item.noOfSeats} seats`,
            status: item.status,
        }));

        setBusTypeOptions(formattedData);
    };

    useEffect(() => {
        fetchBusTypeData();
    }, []);

    const busStatusOptions = ['Active', 'Inactive'];

    const handleSelectBusType = (option) => {
        const selectedBusType = busTypeOptions.find(item => item.typeWithSeats === option);
        setSelectedBusTypeOption(option);
        setIsBusTypeOpen(false);
        setBusDetails(prevData => ({
            ...prevData,
            busTypeID: selectedBusType ? selectedBusType.busTypeID : '',
        }));
    };

    const handleSelectBusStatus = (option) => {
        setSelectedBusStatusOption(option);
        setIsBusStatusOpen(false);
        setBusDetails(prevData => ({
            ...prevData,
            status: option
        }));
    };

    const handleInputChange = (name, value) => {
        setBusDetails((prevData) => {
            const updatedData = {
                ...prevData,
                [name]: value,
            };
            return updatedData;
        });
    };

    const handleSubmit = async () => {
        const response = await createBus(busDetails);

        if (response) {
            alert("Bus added successfully!");
            navigate('/bo/bus');
        } else {
            alert("Bus addition failed!");
        }
    };

    return (
        <>
            <Navbar />

            <div className='w-4/5 mt-8 mx-auto'>
                <div className='flex items-center'>
                    <h2 className='font-poppins font-bold text-2xl'>Bus Management</h2>
                </div>

                <Card header="Bus Information">
                    <div>
                        <label htmlFor="busPlate" className="block text-sm font-poppins font-medium text-gray-700 mb-2">Bus Plate</label>
                        <CustomInput
                            type="text"
                            id="busPlate"
                            className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                            placeholder="Enter Bus Plate"
                            value={busDetails.busPlate}
                            onChange={(e) => handleInputChange('busPlate', e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="busType" className="block text-sm font-poppins font-medium text-gray-700">Bus Type</label>
                        <button
                            onClick={() => setIsBusTypeOpen(!isBusTypeOpen)}
                            className={`inline-flex justify-between items-center w-full h-12 rounded-md border border-gray-300 shadow-sm px-4 mt-2 bg-white text-sm font-poppins font-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${selectedBusTypeOption === 'Select a bus type' ? 'text-gray-400' : 'text-black'}`}
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
                                            onClick={() => handleSelectBusType(option.typeWithSeats)}
                                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                                        >
                                            {option.typeWithSeats}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="busStatus" className="block text-sm font-poppins font-medium text-gray-700">Bus Status</label>
                        <button
                            onClick={() => setIsBusStatusOpen(!isBusStatusOpen)}
                            className={`inline-flex justify-between items-center w-full h-12 rounded-md border border-gray-300 shadow-sm px-4 mt-2 bg-white text-sm font-poppins font-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${selectedBusStatusOption === 'Select a status' ? 'text-gray-400' : 'text-black'}`}
                        >
                            {selectedBusStatusOption}
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

                <div className='mt-8 mb-10'>
                    <CustomButton title='Create' className='font-semibold' onClick={handleSubmit} />
                </div>
            </div>

            <Footer />
        </>
    );
}

export default NewBusForm;