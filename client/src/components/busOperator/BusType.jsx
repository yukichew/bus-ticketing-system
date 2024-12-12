import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiEdit, CiSearch } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import Table from '../common/Table';
import Card from '../common/Card';
import { getAllBusTypesByBusOperatorID, searchBusType, deleteBusType } from '../../api/busType';

const BusType = () => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const [busTypeData, setBusTypeData] = useState([]);
    const [isNumSeatsOpen, setIsNumSeatsOpen] = useState(false);
    const [selectedNumSeatsOption, setSelectedNumSeatsOption] = useState('All');
    const [isBusTypeOpen, setIsBusTypeOpen] = useState(false);
    const [selectedBusTypeOption, setSelectedBusTypeOption] = useState('All');
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedStatusOption, setSelectedStatusOption] = useState('Select a status');
    const [busTypeOptions, setBusTypeOptions] = useState([]);
    const [numSeatsOptions, setNumSeatsOptions] = useState([]);
    const [filters, setFilters] = useState({
        types: '',
        noOfSeats: '',
        status: '',
    });
    const busTypeDropdownRef = useRef(null);
    const numSeatsDropdownRef = useRef(null);
    const statusDropdownRef = useRef(null);

    const handleNavigate = (screen, busTypeID) => {
        switch (screen) {
            case 'newBusType':
                navigate(`/bo/bus/new-bus-type`);
                break;
            case 'editBusType':
                navigate(`/bo/bus/edit-bus-type/${busTypeID}`);
                break;
            default:
                break;
        }
    };

    const fetchBusTypeData = async () => {
        try {
            const results = await getAllBusTypesByBusOperatorID(token);
            const busTypesArr = results?.busTypes || [];
            
            if (Array.isArray(busTypesArr) && busTypesArr.length > 0) {
                const formattedData = busTypesArr.map((item) => ({
                    busTypeID: item.busTypeID,
                    types: item.types,
                    noOfSeats: `${item.noOfSeats} seats`,
                    status: item.status,
                }));
    
                const busTypeOptions = [...new Set(formattedData.map((item) => item.types))];
                const numSeatsOptions = [...new Set(formattedData.map((item) => item.noOfSeats))];
    
                setBusTypeData(formattedData);
                setBusTypeOptions(busTypeOptions);
                setNumSeatsOptions(numSeatsOptions);
            } else {
                setBusTypeData([]);
            }
        } catch (error) {
            setBusTypeData([]);
        }
    };

    useEffect(() => {
        fetchBusTypeData();
    }, []);

    const columns = ['Types', 'No. of Seats'];

    const columnKeys = ['types', 'noOfSeats'];

    const statusOptions = ['Active', 'Inactive'];

    const statusStyles = {
        'Active': 'text-lime-700 bg-lime-100',
        'Inactive': 'text-red-600 bg-red-100',
    };

    const actionIcons = (row) => (
        <div className="flex justify-center space-x-2">
            <div className="relative group">
                <CiEdit 
                    className="text-gray-500 text-xl cursor-pointer" 
                    onClick={() => handleNavigate('editBusType', row.busTypeID)}
                />
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-11 w-16 font-poppins text-center text-sm text-white bg-slate-600 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-1 py-2">
                    Edit
                </div>
            </div>

            <div className="h-6 w-px bg-gray-300"></div>
            
            <div className="relative group">
                <AiOutlineDelete 
                    className="text-gray-500 text-xl cursor-pointer" 
                    onClick={() => handleDelete(row.busTypeID)}
                />
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-11 w-16 font-poppins text-center text-sm text-white bg-slate-600 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-1 py-2">
                    Delete
                </div>
            </div>
        </div>
    );

    const enhancedData = busTypeData.map((item) => ({
        ...item,
        status: (
            <div className={`flex items-center justify-center relative w-40 h-8 ${statusStyles[item.status] || 'text-gray-600 bg-gray-100'} rounded-lg border-1 border-gray-50 shadow-md p-1 font-poppins font-medium text-sm`}>
                {item.status}
            </div>
        ),
    }));
    
    const handleSelectBusType = (option) => {
        setSelectedBusTypeOption(option);
        setFilters((prevFilters) => ({
            ...prevFilters,
            types: option === 'All' ? '' : option,
        }));
        setIsBusTypeOpen(false);
    };
    
    const handleSelectNumSeats = (option) => {
        const numSeatsValue = option === 'All' ? '' : option.replace(' seats', '');
        setSelectedNumSeatsOption(option);
        setFilters((prevFilters) => ({
            ...prevFilters,
            noOfSeats: numSeatsValue,
        }));
        setIsNumSeatsOpen(false);
    };
    
    const handleSelectStatus = (option) => {
        setSelectedStatusOption(option);
        setFilters((prevFilters) => ({
            ...prevFilters,
            status: option === 'Select a status' ? '' : option,
        }));
        setIsStatusOpen(false);
    };

    const handleSearch = async () => {
        const activeFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== '')
        );

        try {
            const results = await searchBusType(activeFilters, token);
            
            if (Array.isArray(results) && results.length > 0) {
                const formattedData = results.map((item) => ({
                    busTypeID: item.busTypeID,
                    types: item.types,
                    noOfSeats: `${item.noOfSeats} seats`,
                    status: item.status,
                }));
    
                setBusTypeData(formattedData);
            } else {
                setBusTypeData([]);
            }
        } catch (error) {
            setBusTypeData([]);
        }
    }

    const handleReset = () => {
        setFilters({
            types: '',
            noOfSeats: '',
            status: '',
        });
        
        setSelectedBusTypeOption('All');
        setSelectedNumSeatsOption('All');
        setSelectedStatusOption('Select a status');

        fetchBusTypeData();
    };

    const handleDelete = async (busTypeID) => {
        const response = await deleteBusType(busTypeID, token);

        if(response){
            toast.success('Bus type deleted successfully!');
            fetchBusTypeData();
        }else{
            toast.error("Bus type deleted failed!");
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (numSeatsDropdownRef.current && !numSeatsDropdownRef.current.contains(event.target)) {
                setIsNumSeatsOpen(false);
            }
            if (busTypeDropdownRef.current && !busTypeDropdownRef.current.contains(event.target)) {
                setIsBusTypeOpen(false);
            }
            if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
                setIsStatusOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className='mb-8 -mt-5'>
                <Card>
                    <div className="mb-6 flex items-center justify-end gap-4 text-gray-700">
                        <div className="flex items-center gap-2 text-primary" onClick={handleSearch}>
                            <CiSearch />
                            <span className="font-poppins font-medium">Search</span>
                        </div>
                        <span className="text-gray-400">|</span>
                        <div className="flex items-center gap-2" onClick={handleReset}>
                            <GrPowerReset />
                            <span className="font-poppins font-medium">Reset</span>
                        </div>
                    </div>

                    <div className="flex justify-between gap-4">
                        <div ref={busTypeDropdownRef} className="relative inline-block text-left w-1/3">
                            <label htmlFor="types" className="block text-sm font-poppins font-medium text-gray-700">Bus Type</label>
                            <button
                                onClick={() => setIsBusTypeOpen(!isBusTypeOpen)}
                                className={`inline-flex justify-between w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 mt-2 bg-white text-sm font-poppins font-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary ${selectedBusTypeOption === 'All' ? 'text-gray-400' : 'text-black'}`}
                            >
                                {selectedBusTypeOption}
                                <RiArrowDropDownLine className="ml-2 h-5 w-5" />
                            </button>

                            {isBusTypeOpen && (
                                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                                    <ul className="max-h-56 rounded-md py-1 text-base font-poppins ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                        {busTypeOptions.map((type, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleSelectBusType(type)}
                                                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                                            >
                                                {type}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div ref={numSeatsDropdownRef} className="relative inline-block text-left w-1/3">
                            <label htmlFor="numSeats" className="block text-sm font-poppins font-medium text-gray-700">No. of Seats</label>
                            <button
                                onClick={() => setIsNumSeatsOpen(!isNumSeatsOpen)}
                                className={`inline-flex justify-between w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 mt-2 bg-white text-sm font-poppins font-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary ${selectedBusTypeOption === 'All' ? 'text-gray-400' : 'text-black'}`}
                            >
                                {selectedNumSeatsOption}
                                <RiArrowDropDownLine className="ml-2 h-5 w-5" />
                            </button>

                            {isNumSeatsOpen && (
                                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                                    <ul className="max-h-56 rounded-md py-1 text-base font-poppins ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                        {numSeatsOptions.map((seats, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleSelectNumSeats(seats)}
                                                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                                            >
                                                {seats}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
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
                                        {statusOptions.map((status, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleSelectStatus(status)}
                                                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                                            >
                                                {status}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex justify-between items-center mt-7">
                <p className='text-gray-500'>
                    <span className='font-semibold text-secondary'>
                        {busTypeData.length} results
                    </span> found
                </p>

                <div className="flex justify-end">
                    <button className='ml-auto flex items-center font-medium hover:text-primary pr-1' onClick={() => handleNavigate('newBusType')}>
                        <IoIosAddCircleOutline size={16} />
                        <p className='mx-1'>New Bus Type</p>
                    </button>
                </div>
            </div>

            {busTypeData.length > 0 ? (
                <>
                    <div className='mt-3 mb-8 mx-auto'>
                        <Table data={enhancedData} columns={columns} columnKeys={columnKeys} showActionColumn={true} actions={actionIcons} />
                    </div>
                </>
            ) : (
                <div className="mt-3 text-center text-gray-500 font-poppins">
                    <span>No results found.</span>
                </div>
            )}
        </>
    );
};

export default BusType;