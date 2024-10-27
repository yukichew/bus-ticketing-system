import React, { useState } from 'react';
import { MdOutlineTitle, MdOutlineSubtitles } from "react-icons/md";
import { RiServiceLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/Footer';
import Card from '../../../components/common/Card';
import CustomButton from '../../../components/common/CustomButton';
import CustomField from '../../../components/common/CustomInput';

const UserProfile = () => {
    const [showBioFields, setShowBioFields] = useState(false);
    const [showServiceFields, setShowServiceFields] = useState(false);

    const handleEdit = () => {
        alert("Icon clicked!");
    };

    const handleAddBio = () => {
        setShowBioFields(true);
    };

    const handleAddService = () => {
        setShowServiceFields(true);
    };

    const [companyInfo] = useState({
        companyname: 'Super Nice Express',
        companyemail: 'contact@superniceexpress.com',
        companycontact: '089-345-6789',
        address: '123, Bukit Jalil, Kuala Lumpur'
    });

    const [personalInfo] = useState({
        fullName: 'Hello World',
        email: 'helloworld@example.com',
        contactno: '012-567-9856'
    });

    return(
        <>
            <Navbar />
            
            <div className='w-4/5 mt-6 mx-auto'>
                <div className="flex items-center">
                    <h2 className="font-poppins font-bold text-2xl">User Profile</h2>
                    <Link
                        to="/"  // Link to Preview
                        className="text-md font-bold hover:text-primary text-gray-400 underline transition duration-200 mt-1 ml-4"
                    >
                        Preview
                    </Link>
                </div>

                <div className="flex justify-center space-x-4 mx-auto">
                    <Card 
                        header="Company Information"
                        Icon={CiEdit}
                        onClick={handleEdit}
                        tooltip="Edit"
                    >
                        <div className="flex flex-col space-y-4">
                            <div>
                                <label htmlFor="companyname" className="block text-sm font-poppins font-medium text-gray-700">Company Name</label>
                                <input
                                    type="text"
                                    id="companyname"
                                    className='w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm text-gray-500 mt-1'
                                    placeholder="Enter company name"
                                    value={companyInfo.companyname}
                                    disabled
                                />
                            </div>
                            <div>
                                <label htmlFor="companyemail" className="block text-sm font-poppins font-medium text-gray-700">Email</label>
                                <input
                                    type="text"
                                    id="companyemail"
                                    className='w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm text-gray-500 mt-1'
                                    placeholder="Enter company email"
                                    value={companyInfo.companyemail}
                                    disabled
                                />
                            </div>
                            <div>
                                <label htmlFor="companycontact" className="block text-sm font-poppins font-medium text-gray-700">Contact No.</label>
                                <input
                                    type="text"
                                    id="companycontact"
                                    className='w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm text-gray-500 mt-1'
                                    placeholder="Enter company contact number"
                                    value={companyInfo.companycontact}
                                    disabled
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-poppins font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    className='w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm text-gray-500 mt-1'
                                    placeholder="Enter address"
                                    value={companyInfo.address}
                                    disabled
                                />
                            </div>
                        </div>
                    </Card>
                    
                    <Card 
                        header="Personal Information"
                        Icon={CiEdit}
                        onClick={handleEdit}
                        tooltip="Edit"
                    >
                        <div className="flex flex-col space-y-4">
                            <div>
                                <label htmlFor="fullname" className="block text-sm font-poppins font-medium text-gray-700">Company Name</label>
                                <input
                                    type="text"
                                    id="fullname"
                                    className='w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm text-gray-500 mt-1'
                                    placeholder="Enter your fullname"
                                    value={personalInfo.fullName}
                                    disabled
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-poppins font-medium text-gray-700">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    className='w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm text-gray-500 mt-1'
                                    placeholder="Enter email"
                                    value={personalInfo.email}
                                    disabled
                                />
                            </div>
                            <div>
                                <label htmlFor="contactno" className="block text-sm font-poppins font-medium text-gray-700">Contact No.</label>
                                <input
                                    type="text"
                                    id="contactno"
                                    className='w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm text-gray-500 mt-1'
                                    placeholder="Enter contact number"
                                    value={personalInfo.contactno}
                                    disabled
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                <div>
                    <Card 
                        header="Bus Photos"
                        Icon={CiEdit} 
                        onClick={handleEdit}
                        tooltip="Edit"
                    > 
                        <div className="flex justify-between space-x-4">
                            <div className="w-1/2 h-40 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                                <img
                                    className="object-cover h-full w-full"
                                    src='https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                    alt='Bus Image 1'
                                />
                            </div>

                            <div className="w-1/2 h-40 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                                <img
                                    className="object-cover h-full w-full"
                                    src='https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                    alt='Bus Image 2'
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                <div>
                    <Card 
                        header="Bio"
                        Icon={CiEdit} 
                        onClick={handleEdit}
                        tooltip="Edit"
                    >
                        {showBioFields && (
                            <>
                                <CustomField
                                    id={'title'}
                                    name={'title'}
                                    placeholder={'Title'}
                                    type={'text'}
                                    required
                                    icon={MdOutlineTitle}
                                />
                                <CustomField
                                    id={'content'}
                                    name={'content'}
                                    placeholder={'Content'}
                                    type={'text'}
                                    required
                                    icon={MdOutlineSubtitles}
                                />
                            </>
                        )}
                        {/* Don't delete */}
                        {/* <div className='mt-12 flex justify-between'>
                            <CustomButton
                                title={'Cancel'}
                                className={'w-40 bg-white text-[#0A21C0] border border-2 border-primary'}
                                // onClick={}
                            />
                            <CustomButton
                                title={'Save'}
                                className={'w-40'}
                                // onClick={}
                            />
                        </div> */}
                        <CustomButton
                            title={(
                                <>
                                    <IoMdAddCircleOutline className="inline-block mr-2 mb-1" size={22} />
                                    Add Bio
                                </>
                            )}
                            onClick={handleAddBio}
                        />
                    </Card>
                </div>

                <div className='mb-6'>
                    <Card 
                        header="Services & Reputations"
                        Icon={CiEdit}
                        onClick={handleEdit}
                        tooltip="Edit"
                    >
                        {showServiceFields && (
                            <>
                                <CustomField
                                    id={'services'}
                                    name={'services'}
                                    placeholder={'Service and Reputations'}
                                    type={'text'}
                                    required
                                    icon={RiServiceLine}
                                />
                            </>
                        )}
                        {/* Don't delete */}
                        {/* <div className='mt-12 flex justify-between'>
                            <CustomButton
                                title={'Cancel'}
                                className={'w-40 bg-white text-[#0A21C0] border border-2 border-primary'}
                                // onClick={}
                            />
                            <CustomButton
                                title={'Save'}
                                className={'w-40'}
                                // onClick={}
                            />
                        </div> */}
                        <CustomButton
                            title={(
                                <>
                                    <IoMdAddCircleOutline className="inline-block mr-2 mb-1" size={22} />
                                    Add Services & Reputations
                                </>
                            )}
                            onClick={handleAddService}
                        />
                    </Card>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default UserProfile;