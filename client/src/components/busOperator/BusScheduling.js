import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import Table from '../common/Table';

const BusScheduling = () => {

    const [data, setData] = useState([
        { id: "1", busPlate: "SMP5792", origin: "Kuala Lumpur", destination: "Penang", etd: "09:00", eta: "11:00" },
        { id: "2", busPlate: "SB8204H", origin: "Johor Bahru", destination: "Malacca", etd: "10:00", eta: "12:30" },
        { id: "3", busPlate: "QPD1151", origin: "Ipoh", destination: "Kota Bharu", etd: "08:30", eta: "10:15" },
        { id: "4", busPlate: "WXY2345", origin: "Shah Alam", destination: "Seremban", etd: "11:30", eta: "13:00" },
        { id: "5", busPlate: "TRG4786", origin: "Kuching", destination: "Kota Kinabalu", etd: "13:00", eta: "14:30" },
        { id: "6", busPlate: "LMN8765", origin: "Sibu", destination: "Miri", etd: "15:00", eta: "17:00" },
        { id: "7", busPlate: "KJD2938", origin: "Langkawi", destination: "Pulau Pinang", etd: "16:30", eta: "18:00" },
        { id: "8", busPlate: "HFG5623", origin: "Alor Setar", destination: "Taiping", etd: "17:15", eta: "19:00" },
        { id: "9", busPlate: "NPQ1234", origin: "George Town", destination: "Kuala Terengganu", etd: "18:00", eta: "20:00" },
        { id: "10", busPlate: "BND9821", origin: "Batu Pahat", destination: "Tawau", etd: "19:00", eta: "21:00" },
        { id: "11", busPlate: "CDE4455", origin: "Kota Bahru", destination: "Sandakan", etd: "08:00", eta: "09:30" },
        { id: "12", busPlate: "VFR9832", origin: "Seremban", destination: "Melaka", etd: "09:30", eta: "11:00" },
        { id: "13", busPlate: "LKJ0921", origin: "Putrajaya", destination: "Cyberjaya", etd: "10:45", eta: "12:00" },
        { id: "14", busPlate: "XYZ7654", origin: "Klang", destination: "Sungai Petani", etd: "11:00", eta: "12:30" },
        { id: "15", busPlate: "FTH9843", origin: "Gombak", destination: "Kota Damansara", etd: "12:00", eta: "13:30" },
        { id: "16", busPlate: "JIK1298", origin: "Bukit Mertajam", destination: "Nusajaya", etd: "13:00", eta: "14:30" },
        { id: "17", busPlate: "GHF1290", origin: "Cameron Highlands", destination: "Temerloh", etd: "14:15", eta: "15:45" },
        { id: "18", busPlate: "PQR7563", origin: "Kota Tinggi", destination: "Lumut", etd: "15:30", eta: "17:00" },
        { id: "19", busPlate: "ASD8732", origin: "Miri", destination: "Sibu", etd: "16:00", eta: "17:30" },
        { id: "20", busPlate: "QWE4321", origin: "Sandakan", destination: "Kota Kinabalu", etd: "17:00", eta: "18:30" }
    ]);

    const columns = ['Bus Plate', 'Origin', 'Destination', 'ETD', 'ETA'];

    const columnKeys = ['busPlate', 'origin', 'destination', 'etd', 'eta'];

    return(
        <>
            <div className="flex justify-between items-center mt-5">
                <p className='text-gray-500'>
                    <span className='font-semibold text-secondary'>20 bus schedules </span>created
                </p>

                <div className="flex justify-end">
                    <button
                        className="flex items-center justify-center h-10 px-4 text-sm font-medium font-poppins tracking-wide text-white transition duration-200 rounded-lg shadow-md bg-primary hover:bg-secondary"
                    >
                        <IoMdAdd className="mr-2 text-white text-base" />
                        New Schedules
                    </button>
                </div>
            </div>

            <div className='mt-3 mx-auto'>
                <Table data={data} columns={columns} columnKeys={columnKeys} showActionColumn={false}/>
            </div>
        </>
    );
}

export default BusScheduling;