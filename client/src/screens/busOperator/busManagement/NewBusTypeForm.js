import React, { useState } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/Footer';
import Card from '../../../components/common/Card';
import CustomButton from '../../../components/common/CustomButton';
import Breadcrumb from '../../../components/common/Breadcrumb';

const NewBusTypeForm = () => {
    const [isBusTypeOpen, setIsBusTypeOpen] = useState(false);
    const [selectedBusTypeOption, setSelectedBusTypeOption] = useState('Select Bus Type');

    const busTypeOptions = ['2+1', '2+2'];

    const handleSelectBusType = (option) => {
        setSelectedBusTypeOption(option);
        setIsBusTypeOpen(false);
    };

    const breadcrumbItems = [
        { name: 'Bus Types', link: '/bo/bus?tab=Bus Types' },
        { name: 'New Bus Type' }
    ];

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

                <div className='flex justify-between w-full gap-12'>
                    <div className='w-1/2'>
                        <Card header="Bus Information">
                            <div className='mt-2'>
                                <label htmlFor="busPlate" className="block text-md font-poppins font-medium text-gray-700">Bus Plate</label>
                                <input
                                    type="text"
                                    id="busPlate"
                                    className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                                    placeholder="Enter Bus Plate"
                                />
                            </div>

                            <div>
                                <label htmlFor="numSeats" className="block text-md font-poppins font-medium text-gray-700">No. of Seats</label>
                                <input
                                    type="number"
                                    id="numSeats"
                                    min="1"
                                    className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                                    placeholder="Enter Number of Seats"
                                />
                            </div>

                            <div className="relative inline-block text-left w-full">
                                <label htmlFor="busType" className="block text-md font-poppins font-medium text-gray-700">Bus Type</label>
                                <button
                                    onClick={() => setIsBusTypeOpen(!isBusTypeOpen)}
                                    className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 mt-2 bg-white text-sm font-poppins font-small text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
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
                        </Card>
                    </div>

                    <div className='w-1/2'>
                        <Card header="Driver Information">
                            <div className='mt-2'>
                                <label htmlFor="fullname" className="block text-md font-poppins font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    id="fullname"
                                    className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                                    placeholder="Enter Full Name"
                                />
                            </div>

                            <div>
                                <label htmlFor="ic" className="block text-md font-poppins font-medium text-gray-700">IC Number</label>
                                <input
                                    type="text"
                                    id="ic"
                                    className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                                    placeholder="Enter IC Number"
                                />
                            </div>

                            <div>
                                <label htmlFor="contactNo" className="block text-md font-poppins font-medium text-gray-700">Contact No.</label>
                                <input
                                    type="text"
                                    id="contactNo"
                                    className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                                    placeholder="Enter Contact No."
                                />
                            </div>
                        </Card>
                    </div>
                </div>
                
                <div className='mt-8 mb-10'>
                    <CustomButton title='Create' className='font-semibold'/>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default NewBusTypeForm;
