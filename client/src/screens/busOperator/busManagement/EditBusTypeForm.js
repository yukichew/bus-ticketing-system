import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/Footer';
import Card from '../../../components/common/Card';
import CustomButton from '../../../components/common/CustomButton';
import CustomInput from '../../../components/common/CustomInput';
import Breadcrumb from '../../../components/common/Breadcrumb';

const EditBusTypeForm = () => {
    const navigate = useNavigate();
    const { bus_id } = useParams();
    const [isBusTypeOpen, setIsBusTypeOpen] = useState(false);
    const [selectedBusTypeOption, setSelectedBusTypeOption] = useState('Select a bus type');
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedStatusOption, setSelectedStatusOption] = useState('Select a status');
    const [formData, setFormData] = useState({
        busPlate: '',
        numSeats: '',
        busTypes: '',
        status: '',
    });

    const handleSelectBusType = (option) => {
        setSelectedBusTypeOption(option);
        setIsBusTypeOpen(false);
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

    const handleCancel = () => {
        setFormData({
            busPlate: '',
            numSeats: '',
            busTypes: '',
            status: '',
        });
    };

    const breadcrumbItems = [
        { name: 'Bus Types', link: '/bo/bus?tab=Bus Types' },
        { name: 'Edit Bus Type' }
    ];

    const busTypeOptions = ['2+1', '2+2'];

    const statusOptions = ['Active', 'Inactive'];

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

                <Card header="Bus Information">
                    <div className="flex gap-4 mt-2">
                        <div className="w-1/2">
                            <label htmlFor="busPlate" className="block text-sm font-poppins font-medium text-gray-700 mb-2">Bus Plate</label>
                            <CustomInput
                                type="text"
                                id="busPlate"
                                name="busPlate"
                                className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                                placeholder="Enter Bus Plate"
                                value={formData.busPlate}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="w-1/2">
                            <label htmlFor="numSeats" className="block text-sm font-poppins font-medium text-gray-700 mb-2">No. of Seats</label>
                            <CustomInput
                                type="number"
                                id="numSeats"
                                name="numSeats"
                                min="1"
                                className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                                placeholder="Enter Number of Seats"
                                value={formData.numSeats}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <div className="w-1/2 relative inline-block text-left">
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

                        <div className="w-1/2 relative inline-block text-left">
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
                
                <div className='mt-8 mb-10 flex justify-between'>
                    <CustomButton title='Cancel' className='w-24' onClick={handleCancel}/>
                    <CustomButton title='Save' className='w-24'/>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default EditBusTypeForm;