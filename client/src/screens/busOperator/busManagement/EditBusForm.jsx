import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import Container from '../../../components/Container';
import Card from '../../../components/common/Card';
import CustomButton from '../../../components/common/CustomButton';
import CustomInput from '../../../components/common/CustomInput';
import { getBus, updateBus } from '../../../api/busInfo';
import { getAllBusTypesByBusOperatorID, getBusType } from '../../../api/busType';
import * as yup from "yup";
import { validateField } from '../../../utils/validate';
import { toast } from 'react-toastify';

const EditBusForm = () => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const { busID } = useParams();
    const [busPlate, setBusPlate] = useState("");
    const [busType, setBusType] = useState("");
    const [status, setStatus] = useState("");
    const [busTypeOptions, setBusTypeOptions] = useState([]);
    const [isBusTypeOpen, setIsBusTypeOpen] = useState(false);
    const [selectedBusTypeOption, setSelectedBusTypeOption] = useState('Select a bus type');
    const [isBusStatusOpen, setIsBusStatusOpen] = useState(false);
    const [selectedBusStatusOption, setSelectedBusStatusOption] = useState('Select a status');
    const [errors, setErrors] = useState({});
    const [busDetails, setBusDetails] = useState({
        busID: '',
        busPlate: '',
        busTypeID: '',
        status: '',
    });

    const editBusSchema = yup.object().shape({
        busPlate: yup
          .string()
          .matches(/^[A-Z0-9 ]+$/, "Bus Plate must only contain uppercase letters and numbers.")
          .required("Bus Plate is required"),
        busType: yup
          .string()
          .required("Bus Type is required"),
        status: yup
          .string()
          .required("Status is required")
    });

    const fetchBusData = async () => {
        const result = await getBus(busID, token);
        const busType = result?.busType || {};
    
        setBusDetails({
            busID: result.busID,
            busPlate: result.busPlate,
            busTypeID: busType.busTypeID,
            status: result.status,
        });
    
        setSelectedBusStatusOption(result.status);
    
        if (busType.busTypeID) {
            const busTypeResult = await getBusType(busType.busTypeID);
            const busTypeOption = `${busTypeResult.types}, ${busTypeResult.noOfSeats} seats`;
    
            setSelectedBusTypeOption(busTypeOption);
        }
    };

    const fetchBusTypeData = async () => {
        const results = await getAllBusTypesByBusOperatorID(token);
        const busTypesArr = results?.busTypes || [];

        const formattedData = busTypesArr.map((item) => ({
            busTypeID: item.busTypeID,
            typeWithSeats: `${item.types}, ${item.noOfSeats} seats`,
            status: item.status,
        }));

        setBusTypeOptions(formattedData);
    };

    useEffect(() => {
        fetchBusTypeData();
        fetchBusData();
    }, []);

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

    const handleInputChange = (field, value) => {
        if (field === "busPlate") setBusPlate(value);
        if (field === "busType") setBusType(value);
        if (field === "status") setStatus(value);
        validateField(field, value, setErrors, editBusSchema);

        setBusDetails((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!busDetails.busPlate || !busDetails.busTypeID || selectedBusStatusOption === 'Select a status') {
            alert('Please fill out all fields.');
            return;
        }

        const updatedDetails = {
            busID: busDetails.busID,
            busPlate: busDetails.busPlate,
            busTypeID: busDetails.busTypeID,
            status: selectedBusStatusOption,
        };

        const response = await updateBus(busID, updatedDetails, token);

        if (response?.error) {
            return toast.error(response.message);
        }
        toast.success('Bus updated successfully.');
        navigate('/bo/bus');
    };

    const handleCancel = () => {
        navigate('/bo/bus');
    };

    const busStatusOptions = ['Active', 'Inactive'];

    return (
        <>
            <Container>
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
                                error={errors.busPlate}
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

                    <div className='mt-8 mb-10 flex justify-between'>
                        <div className='w-28'>
                            <CustomButton title="Cancel" onClick={handleCancel} />
                        </div>
                        <div className='w-28'>
                            <CustomButton title="Save" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default EditBusForm;