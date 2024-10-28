import React, { useState } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/Footer';
import BusTypes from './BusTypes';

const ManageBus = () => {
    const [activeSection, setActiveSection] = useState('Main');

    const renderContent = () => {
        switch (activeSection) {
            case 'Main':
                return <div>Main</div>;
            case 'Bus Types':
                return <BusTypes />;
            case 'Bus Scheduling':
                return <div>Bus Scheduling</div>;
            default:
                return null;
        }
    };

    return (
        <>
            <Navbar />

            <div className="w-4/5 mt-8 mx-auto">
                <div className="flex items-center">
                    <h2 className="font-poppins font-bold text-2xl">Bus Management</h2>
                </div>

                <div className="flex items-center space-x-8 mt-5 border-b">
                    <div
                        onClick={() => setActiveSection('Main')}
                        className={`cursor-pointer pb-2 border-b-2 ${
                            activeSection === 'Main'
                                ? 'border-primary text-primary font-medium'
                                : 'border-transparent text-gray-400 hover:text-primary'
                        } transition duration-300 flex items-center`}
                    >
                        <span>Main</span>
                    </div>

                    <div
                        onClick={() => setActiveSection('Bus Types')}
                        className={`cursor-pointer pb-2 border-b-2 ${
                            activeSection === 'Bus Types'
                                ? 'border-primary text-primary font-medium'
                                : 'border-transparent text-gray-400 hover:text-primary'
                        } transition duration-300 flex items-center`}
                    >
                        <span>Bus Types</span>
                    </div>

                    <div
                        onClick={() => setActiveSection('Bus Scheduling')}
                        className={`cursor-pointer pb-2 border-b-2 ${
                            activeSection === 'Bus Scheduling'
                                ? 'border-primary text-primary font-medium'
                                : 'border-transparent text-gray-400 hover:text-primary'
                        } transition duration-300 flex items-center`}
                    >
                        <span>Bus Scheduling</span>
                    </div>
                </div>

                <div className="mt-6 mb-6">
                    {renderContent()}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ManageBus;