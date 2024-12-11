import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginHero = () => {
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate("/");
    };

    return (
        <>
            <section className="relative w-full h-full">
                <img
                    src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="RideNGo Hero"
                    className="absolute inset-0 object-cover w-full h-full"
                />

                <div className="relative bg-gray-900 bg-opacity-65 w-full h-full flex items-start justify-center pt-40">
                    <div className="text-center p-8">
                        <h2 className="font-poppins max-w-lg text-3xl text-gray-300 text-left font-extrabold leading-relaxed px-8">
                            Book Your Bus Tickets on <br />
                            <p className="text-5xl">RideNGo</p>
                        </h2>
                        <p className="mt-4 text-gray-200 font-poppins font-small text-md max-w-lg text-left text-justify px-8 mt-5">
                            RideNGo stands as Malaysia's leading online platform for bus
                            ticketing, earning the trust of millions of global travellers.
                        </p>
                        <div className='flex items-start font-poppins px-8 mt-3'>
                            <button className='p-3 rounded-xl border border-gray-200 text-gray-200 hover:bg-gray-200 hover:text-gray-700 hover:font-semibold' onClick={navigateToHome}>
                                Visit Our Website
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LoginHero;