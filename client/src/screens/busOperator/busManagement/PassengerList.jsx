import React, { useState, useEffect, useRef } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiExport } from "react-icons/ci";
import Container from '../../../components/Container';
import Table from '../../../components/common/Table';

const PassengerList = () => {
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedStatusOption, setSelectedStatusOption] = useState('Select a status');
    const statusDropdownRef = useRef(null);

    const [passengerData, setPassengerData] = useState([
        { id: "1", name: "John Doe", ic: "123456-78-9012", contactNo: "012-3456789", email: "john.doe@example.com", status: "Confirmed" },
        { id: "2", name: "Jane Smith", ic: "234567-89-0123", contactNo: "013-4567890", email: "jane.smith@example.com", status: "Confirmed" },
        { id: "3", name: "Alice Johnson", ic: "345678-90-1234", contactNo: "014-5678901", email: "alice.johnson@example.com", status: "Completed" },
        { id: "4", name: "Bob Brown", ic: "456789-01-2345", contactNo: "015-6789012", email: "bob.brown@example.com", status: "Confirmed" },
        { id: "5", name: "Charlie Green", ic: "567890-12-3456", contactNo: "016-7890123", email: "charlie.green@example.com", status: "Refunded" },
        { id: "6", name: "David White", ic: "678901-23-4567", contactNo: "017-8901234", email: "david.white@example.com", status: "Confirmed" },
        { id: "7", name: "Eva Black", ic: "789012-34-5678", contactNo: "018-9012345", email: "eva.black@example.com", status: "Confirmed" },
        { id: "8", name: "Frank Blue", ic: "890123-45-6789", contactNo: "019-0123456", email: "frank.blue@example.com", status: "Boarded" },
        { id: "9", name: "Grace Yellow", ic: "901234-56-7890", contactNo: "020-1234567", email: "grace.yellow@example.com", status: "Boarded" },
        { id: "10", name: "Henry Red", ic: "012345-67-8901", contactNo: "021-2345678", email: "henry.red@example.com", status: "Confirmed" },
        { id: "11", name: "Ivy Violet", ic: "123456-78-9012", contactNo: "022-3456789", email: "ivy.violet@example.com", status: "Confirmed" },
        { id: "12", name: "Jack Gray", ic: "234567-89-0123", contactNo: "023-4567890", email: "jack.gray@example.com", status: "Refunded" },
        { id: "13", name: "Kate Cyan", ic: "345678-90-1234", contactNo: "024-5678901", email: "kate.cyan@example.com", status: "Confirmed" },
        { id: "14", name: "Liam Magenta", ic: "456789-01-2345", contactNo: "025-6789012", email: "liam.magenta@example.com", status: "Confirmed" }
    ]);
    
    const columns = ['Name', 'IC No.', 'Contact No.', 'Email'];

    const columnKeys = ['name', 'ic', 'contactNo', 'email'];

    const statusOptions = ['Confirmed', 'Boarded', 'Completed', 'Refunded'];

    const statusStyles = {
        'Confirmed': 'text-blue-600 bg-blue-100',
        'Boarded': 'text-yellow-600 bg-yellow-100',
        'Completed': 'text-lime-700 bg-lime-100',
        'Refunded': 'text-red-600 bg-red-100',
    };

    const enhancedData = passengerData.map((item) => ({
        ...item,
        status: (
            <div className={`flex items-center justify-center relative w-40 h-8 ${statusStyles[item.status] || 'text-gray-600 bg-gray-100'} rounded-lg border-1 border-gray-50 shadow-md p-1 font-poppins font-medium text-sm`}>
                {item.status}
            </div>
        ),
    }));

    const handleSelectStatus = (option) => {
        setSelectedStatusOption(option);
        setIsStatusOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
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
            <Container>

            <div className='w-4/5 mt-8 mx-auto'>
                <div className='flex items-center'>
                    <h2 className='font-poppins font-bold text-2xl'>Passenger List</h2>
                </div>

                <div className="border border-gray-100 rounded-lg p-4 bg-white shadow-md mt-4">
                    <div className="flex justify-between gap-4">
                        <div className="w-1/3 pr-2">
                            <label htmlFor="name" className="block text-sm font-poppins font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                                placeholder="Enter passenger's name"
                            />
                        </div>

                        <div className="w-1/3 pr-2">
                            <label htmlFor="icNo" className="block text-sm font-poppins font-medium text-gray-700">IC Number</label>
                            <input
                                type="text"
                                id="icNo"
                                className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                                placeholder="Enter IC Number"
                            />
                        </div>

                        <div className="w-1/3 pr-2">
                            <label htmlFor="contactNo" className="block text-sm font-poppins font-medium text-gray-700">Contact No.</label>
                            <input
                                type="text"
                                id="contactNo"
                                className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                                placeholder="Enter Contact No."
                            />
                        </div>
                    </div>

                    <div className="flex justify-between gap-4 mt-4">
                        <div className="w-2/3 pr-2">
                            <label htmlFor="email" className="block text-sm font-poppins font-medium text-gray-700">Email</label>
                            <input
                                type="text"
                                id="email"
                                className="mt-2 block w-full text-sm font-poppins rounded-lg p-2 ring-1 ring-gray-300 focus:ring-primary focus:outline-none"
                                placeholder="Enter Email"
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
                </div>

                <div className="flex justify-between items-center mt-5">
                    <p className='text-gray-500'>
                        <span className='font-semibold text-secondary'>14 passengers </span>found
                    </p>

                    <div className="flex justify-end">  
                        <button className='ml-auto flex items-center font-medium hover:text-primary pr-1'>
                            <CiExport size={16} />
                            <p className='mx-1'>Export</p>
                        </button>
                    </div>
                </div>

                <div className='mt-3 mb-5 mx-auto'>
                    <Table data={enhancedData} columns={columns} columnKeys={columnKeys} showActionColumn={false}/>
                </div>
            </div>

            </Container>
        </>
    );
}

export default PassengerList;