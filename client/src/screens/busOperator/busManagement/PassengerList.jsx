import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../../components/Container';
import Table from '../../../components/common/Table';
import { getPassengerList } from '../../../api/seat';

const PassengerList = () => {
    const token = sessionStorage.getItem('token');
    const { busScheduleID } = useParams();
    const [passengerData, setPassengerData] = useState([]);

    const fetchPassengerData = async () => {
        try {
            const results = await getPassengerList(token, busScheduleID);

            if (Array.isArray(results) && results.length > 0) {
                const formattedData = results.map((item) => ({
                    passengerID: item.passenger.passengerID,
                    name: item.passenger.fullname,
                    contactNo: item.passenger.phoneNumber,
                    email: item.passenger.email,
                    seatNo: item.seatNumber,
                    status: item.booking.bookingStatus,
                }));

                setPassengerData(formattedData);

            } else {
                setPassengerData([]);
            }
        } catch (error) {
            setPassengerData([]);
        }
    };

    useEffect(() => {
        fetchPassengerData();
    }, []);

    const columns = ['Name', 'Contact No.', 'Email', 'Seat No'];

    const columnKeys = ['name', 'contactNo', 'email', 'seatNo'];

    const statusStyles = {
        'Confirmed': 'text-lime-700 bg-lime-100'
    };

    const enhancedData = passengerData.map((item) => ({
        ...item,
        status: (
            <div className={`flex items-center justify-center relative w-40 h-8 ${statusStyles[item.status] || 'text-gray-600 bg-gray-100'} rounded-lg border-1 border-gray-50 shadow-md p-1 font-poppins font-medium text-sm`}>
                {item.status}
            </div>
        ),
    }));

    return(
        <>
            <Container>

            <div className='w-4/5 mt-8 mx-auto'>
                <div className='flex items-center'>
                    <h2 className='font-poppins font-bold text-2xl'>Passenger List</h2>
                </div>

                <div className="flex justify-between items-center mt-5">
                    <p className='text-gray-500'>
                        <span className='font-semibold text-secondary'>
                            {passengerData.length} {passengerData.length === 1 ? 'passenger' : 'passengers'} 
                        </span>{" "}
                        found
                    </p>
                </div>

                {passengerData.length > 0 ? (
                    <>
                        <div className='mt-3 mb-8 mx-auto'>
                            <Table data={enhancedData} columns={columns} columnKeys={columnKeys} showActionColumn={false}/>
                        </div>
                    </>
                ) : (
                    <div className="mt-3 text-center text-gray-500 font-poppins">
                        <span>No results found.</span>
                    </div>
                )}
            </div>

            </Container>
        </>
    );
}

export default PassengerList;