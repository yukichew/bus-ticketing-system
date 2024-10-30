import React from "react";

const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="py-2 px-4 border-b text-left font-poppins text-sm"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {columns.map((column) => (
                <td key={column.accessor} className="py-2 px-4 text-left">
                  {column.Cell ? column.Cell({ row }) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
