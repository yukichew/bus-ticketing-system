import React, { useState } from 'react';

const Table = ({ data, columns, columnKeys }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const rowsPerPage = 20;

    const totalRows = data.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(currentRows.map((_, index) => (currentPage - 1) * rowsPerPage + index));
        } else {
            setSelectedRows([]);
        }
    };

    const handleRowSelect = (index) => {
        const absoluteIndex = (currentPage - 1) * rowsPerPage + index;
        if (selectedRows.includes(absoluteIndex)) {
            setSelectedRows(selectedRows.filter((i) => i !== absoluteIndex));
        } else {
            setSelectedRows([...selectedRows, absoluteIndex]);
        }
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`px-3 py-1 rounded border ${
                        currentPage === i ? 'bg-primary text-white' : 'bg-white text-gray-700'
                    }`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    const currentRows = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div className="w-full mx-auto">
            <table className="min-w-full table-auto rounded-lg border border-gray-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-4 py-2 border text-center">
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                                className="mx-auto"
                            />
                        </th>
                        {columns.map((col, index) => (
                            <th key={index} className="px-4 py-2 text-left text-base border font-poppins font-semibold">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border text-center">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes((currentPage - 1) * rowsPerPage + index)}
                                    onChange={() => handleRowSelect(index)}
                                    className="mx-auto"
                                />
                            </td>
                            {columnKeys.map((key, colIndex) => (
                                <td key={colIndex} className="px-4 py-2 text-md text-left text-gray-600 border font-poppins">
                                    {row[key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-600 font-poppins">
                    Showing {currentRows.length} of {totalRows}
                </div>
                <div className="flex space-x-2 font-poppins">
                    {renderPagination()}
                </div>
            </div>
        </div>
    );
};

export default Table;