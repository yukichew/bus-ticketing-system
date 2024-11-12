import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  // Set initial state for year only
  const [selectedYear, setSelectedYear] = useState('2023');

  // Function to generate sample data based on the selected year
  const getYearlyData = (year) => {
    const yearData = {
      2023: [100, 120, 180, 130, 200, 220, 250, 270, 290, 310, 330, 350],
      2024: [80, 110, 170, 140, 180, 210, 230, 250, 270, 290, 310, 330],
      2025: [90, 130, 190, 150, 210, 240, 260, 280, 300, 320, 340, 360],
    };
    return yearData[year] || [];
  };

  // Sample data for each bus type based on the selected year
  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Executive (24 Seats)',
        data: getYearlyData(selectedYear),
        borderColor: '#0A21C0',
        backgroundColor: 'rgba(10, 33, 192, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Executive (40 Seats)',
        data: getYearlyData(selectedYear).map((val) => val + 20),
        borderColor: '#2c2E3A',
        backgroundColor: 'rgba(44, 46, 58, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Double Deck (Upper Deck)',
        data: getYearlyData(selectedYear).map((val) => val - 10),
        borderColor: '#050A44',
        backgroundColor: 'rgba(5, 10, 68, 0.2)',
        tension: 0.3,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Ticket Sales in ${selectedYear}`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Tickets Sold',
        },
      },
    },
  };

  return (
    <div className='w-full max-w-4xl mx-auto mt-10 relative font-poppins'>
      <div className='absolute top-0 right-0 mt-4 mr-4'>
        {/* Year Selector */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className='p-2 border rounded'
        >
          {['2023', '2024', '2025'].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Render Line Chart */}
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
