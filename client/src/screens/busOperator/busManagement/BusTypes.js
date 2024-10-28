import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import Table from '../../../components/common/Table';

const BusTypes = () => {
    const [selectedOption, setSelectedOption] = useState('all');

    const data = [
        { busPlate: "SMP5792", seats: '30', busType: '2+1' },
        { busPlate: "SB8204H", seats: '40', busType: '2+1' },
        { busPlate: "QPD1151", seats: '56', busType: '2+2' },
        { busPlate: "WXY2345", seats: '45', busType: '2+1' },
        { busPlate: "TRG4786", seats: '32', busType: '2+2' },
        { busPlate: "LMN8765", seats: '50', busType: '2+2' },
        { busPlate: "KJD2938", seats: '25', busType: '2+1' },
        { busPlate: "HFG5623", seats: '60', busType: '2+2' },
        { busPlate: "NPQ1234", seats: '35', busType: '2+1' },
        { busPlate: "BND9821", seats: '55', busType: '2+2' },
        { busPlate: "CDE4455", seats: '48', busType: '2+1' },
        { busPlate: "VFR9832", seats: '40', busType: '2+2' },
        { busPlate: "LKJ0921", seats: '38', busType: '2+1' },
        { busPlate: "XYZ7654", seats: '50', busType: '2+1' },
        { busPlate: "FTH9843", seats: '42', busType: '2+2' },
        { busPlate: "JIK1298", seats: '46', busType: '2+2' },
        { busPlate: "GHF1290", seats: '52', busType: '2+1' },
        { busPlate: "PQR7563", seats: '30', busType: '2+2' },
        { busPlate: "ASD8732", seats: '28', busType: '2+1' },
        { busPlate: "QWE4321", seats: '62', busType: '2+2' }
    ];

    const columns = ['Bus Plate', 'No. of Seats', 'Bus Type'];

    const columnKeys = ['busPlate', 'seats', 'busType'];

    const actionIcons = (row) => (
        <div className="flex justify-center space-x-2">
            <CiEdit className="text-gray-500 text-xl cursor-pointer" />
        </div>
    );

    return (
        <>
            <div className="border border-gray-100 rounded-lg p-4 bg-white shadow-md mt-5">
                <div className="flex justify-between gap-4">
                    <div className="w-1/3 pr-2">
                        <label htmlFor="busPlate" className="block text-md font-poppins font-medium text-gray-700">Bus Plate</label>
                        <input
                            type="text"
                            id="busPlate"
                            className="mt-2 block w-full border border-gray-300 text-sm font-poppins rounded-lg p-2"
                            placeholder="Enter Bus Plate"
                        />
                    </div>

                    <div className="w-1/3 px-2">
                        <label htmlFor="numSeats" className="block text-md font-poppins font-medium text-gray-700">No. of Seats</label>
                        <input
                            type="number"
                            id="numSeats"
                            min="1"
                            className="mt-2 block w-full border border-gray-300 text-sm font-poppins rounded-lg p-2"
                            placeholder="Enter Number of Seats"
                        />
                    </div>

                    <div className="w-1/3 pl-2">
                        <label className="block text-md font-poppins font-medium text-gray-700">Bus Type</label>
                        <div className="flex space-x-8 mt-2">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="seatOption"
                                    value="all"
                                    checked={selectedOption === 'all'}
                                    onChange={() => setSelectedOption('all')}
                                    className={`mr-2 font-poppins text-sm`}
                                />
                                <span className={`font-poppins text-sm`}>All</span>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="seatOption"
                                    value="2+1"
                                    checked={selectedOption === '2+1'}
                                    onChange={() => setSelectedOption('2+1')}
                                    className={`mr-2 font-poppins text-sm`}
                                />
                                <span className={`font-poppins text-sm`}>2+1</span>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="seatOption"
                                    value="2+2"
                                    checked={selectedOption === '2+2'}
                                    onChange={() => setSelectedOption('2+2')}
                                    className={`mr-2 font-poppins text-sm`}
                                />
                                <span className={`font-poppins text-sm`}>2+2</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-5">
                <p className='text-gray-500'>
                    <span className='font-semibold text-secondary'>20 buses </span>found
                </p>

                <div className="flex justify-end">
                    <button
                        className="flex items-center justify-center h-10 px-4 text-sm font-medium font-poppins tracking-wide text-white transition duration-200 rounded-lg shadow-md bg-primary hover:bg-secondary"
                    >
                        <IoMdAdd className="mr-2 text-white text-base" />
                        New Bus
                    </button>
                </div>
            </div>

            <div className='mt-3 mx-auto'>
                <Table data={data} columns={columns} columnKeys={columnKeys} showActionColumn={true} actions={actionIcons}/>
            </div>
        </>
    );
};

export default BusTypes;