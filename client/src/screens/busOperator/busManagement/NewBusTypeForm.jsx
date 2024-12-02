import React, { useState } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/Footer';
import Card from '../../../components/common/Card';
import CustomButton from '../../../components/common/CustomButton';
import CustomInput from '../../../components/common/CustomInput';

const NewBusTypeForm = () => {
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedStatusOption, setSelectedStatusOption] = useState('Select a status');
    const [formData, setFormData] = useState({
        numSeats: '',
        types: '',
        status: '',
    });

    const statusOptions = ['Active', 'Inactive'];

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

                <Card header="Bus Information">
                    <div>
                        <label htmlFor="busType" className="block text-sm font-poppins font-medium text-gray-700 mb-2">Types</label>
                        <CustomInput
                            id={'types'}
                            name={'Types'}
                            placeholder={'Enter Bus Type'}
                            type={'text'}
                            required
                            // value={formData.fullname}
                        />
                    </div>

                    <div>
                        <label htmlFor="numSeats" className="block text-sm font-poppins font-medium text-gray-700 mb-2">No. of Seats</label>
                        <CustomInput
                            type="number"
                            id="numSeats"
                            min="1"
                            className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                            placeholder="Enter Number of Seats"
                        />
                    </div>

                    <div className="w-full relative inline-block">
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
                </Card>
                
                <div className='mt-8 mb-10'>
                    <CustomButton title='Create' className='font-semibold'/>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default NewBusTypeForm;
