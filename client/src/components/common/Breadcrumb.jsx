import React from 'react';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
    return (
        <nav aria-label="breadcrumb" className="text-gray-500 font-poppins">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <span className="text-gray-400 mx-2 -ml-1"><MdKeyboardDoubleArrowRight /></span>
                </li>
                
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {index !== 0 && <span className="text-gray-400 mx-2"><MdKeyboardDoubleArrowRight /></span>}
                        {item.link ? (
                            <Link to={item.link} className="text-gray-400 hover:underline">
                                {item.name}
                            </Link>
                        ) : (
                            <span className="font-semibold text-primary">{item.name}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;