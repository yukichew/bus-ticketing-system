import React, { useState } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/Footer';

const ManageBus = () => {
    const [activeSection, setActiveSection] = useState('Main');

    const renderContent = () => {
        switch (activeSection) {
            case 'Main':
                return <div>Main</div>;
            case 'Bus Types':
                return <div>Bus Types</div>;
            case 'Bus Scheduling':
                return <div>Bus Scheduling</div>;
            default:
                return null;
        }
    };

    return(
        <>
            <Navbar />

            <div className='w-4/5 mt-8 mx-auto'>
                <div className="flex items-center">
                    <h2 className="font-poppins font-bold text-2xl">Bus Management</h2>
                </div>

                <div className="flex items-center space-x-5 mt-5">
                    <button
                        onClick={() => setActiveSection('Main')}
                        className={`px-6 py-2 border font-poppins shadow-md rounded-lg transition duration-300 ${
                            activeSection === 'Main'
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-400 border-gray-200 hover:bg-slate-50 hover:text-primary hover:font-medium hover:border-slate-50'
                        }`}
                    >
                        Main
                    </button>

                    <button
                        onClick={() => setActiveSection('Bus Types')}
                        className={`px-6 py-2 border font-poppins shadow-md rounded-lg transition duration-300 ${
                            activeSection === 'Bus Types'
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-400 border-gray-200 hover:bg-slate-50 hover:text-primary hover:font-medium hover:border-slate-50'
                        }`}
                    >
                        Bus Types
                    </button>

                    <button
                        onClick={() => setActiveSection('Bus Scheduling')}
                        className={`px-6 py-2 border font-poppins shadow-md rounded-lg transition duration-300 ${
                            activeSection === 'Bus Scheduling'
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-400 border-gray-200 hover:bg-slate-50 hover:text-primary hover:font-medium hover:border-slate-50'
                        }`}
                    >
                        Bus Scheduling
                    </button>
                </div>

                <div className="mt-6 mb-6">
                    {renderContent()}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default ManageBus;