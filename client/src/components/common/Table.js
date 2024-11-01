import React, { useState } from 'react';

const Table = ({ data, columns, columnKeys, showActionColumn = false, actions }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const rowsPerPage = 10;
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
        const maxVisiblePages = 3;

        let startPage, endPage;
        if (totalPages <= maxVisiblePages) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const halfMaxVisible = Math.floor(maxVisiblePages / 2);
            startPage = Math.max(1, currentPage - halfMaxVisible);
            endPage = Math.min(totalPages, currentPage + halfMaxVisible);

            if (startPage === 1) {
                endPage = maxVisiblePages;
            } else if (endPage === totalPages) {
                startPage = totalPages - maxVisiblePages + 1;
            }
        }

        if (currentPage > 1) {
            pages.push(
                <button
                    key="prev"
                    className="px-3 py-1 rounded border bg-white text-gray-700"
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    {'<'}
                </button>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
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

        if (currentPage < totalPages) {
            pages.push(
                <button
                    key="next"
                    className="px-3 py-1 rounded border bg-white text-gray-700"
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    {'>'}
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
                        {/* checkbox column */}
                        <th className="px-4 py-2 border text-center w-16">
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                                className="mx-auto"
                            />
                        </th>
                        {/* index column */}
                        <th className="px-4 py-2 text-center text-base border font-poppins font-semibold w-16">No.</th>
                        {columns.map((col, index) => (
                            <th key={index} className="px-4 py-2 text-left text-base border font-poppins font-semibold">
                                {col}
                            </th>
                        ))}
                        {/* Status column */}
                        <th className="px-4 py-2 text-center text-base border font-poppins font-semibold w-40">Status</th>
                        {showActionColumn && (
                            <th className="px-4 py-2 text-center text-base border font-poppins font-semibold w-28">Action</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            {/* checkbox column */}
                            <td className="px-4 py-2 border text-center">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes((currentPage - 1) * rowsPerPage + index)}
                                    onChange={() => handleRowSelect(index)}
                                    className="mx-auto"
                                />
                            </td>
                            {/* index column */}
                            <td className="px-4 py-2 text-md text-center text-gray-600 border font-poppins">
                                {(currentPage - 1) * rowsPerPage + index + 1}
                            </td>
                            {columnKeys.map((key, colIndex) => (
                                <td key={colIndex} className="px-4 py-2 text-md text-left text-gray-600 border font-poppins">
                                    {row[key]}
                                </td>
                            ))}
                            {/* Status column */}
                            <td className="px-4 py-2 text-md text-center text-gray-600 border font-poppins">
                                {row.status}
                            </td>
                            {/* action column */}
                            {showActionColumn && (
                                <td className="px-4 py-2 text-center text-md text-gray-600 border font-poppins">
                                    {actions ? actions(row) : null}
                                </td>
                            )}
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