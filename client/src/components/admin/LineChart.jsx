import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { getTransactionsDetails } from "../../api/transaction";

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
  const [selectedYear, setSelectedYear] = useState("2024");
  const [transactionsData, setTransactionsData] = useState([]);
  const [busTypeSalesData, setBusTypeSalesData] = useState({});
  const [availableYears, setAvailableYears] = useState([2024]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { transactions } = await getTransactionsDetails();
        setTransactionsData(transactions);

        const years = [
          ...new Set(
            transactions.map((transaction) =>
              new Date(transaction.createdAt).getFullYear()
            )
          ),
        ];
        setAvailableYears(years);

        const busTypeMonthlySales = {};

        transactions.forEach((transaction) => {
          const transactionDate = new Date(transaction.createdAt);
          const transactionYear = transactionDate.getFullYear();
          if (transactionYear === parseInt(selectedYear)) {
            const month = transactionDate.getMonth();

            const busType = transaction.types;

            if (busType) {
              if (!busTypeMonthlySales[busType]) {
                busTypeMonthlySales[busType] = new Array(12).fill(0);
              }

              busTypeMonthlySales[busType][month] += transaction.amount;
            }
          }
        });

        setBusTypeSalesData(busTypeMonthlySales);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [selectedYear]);

  const getBusTypeColor = (busType, alpha = 1) => {
    const colors = {
      "Executive (2+1)": "#FF5733",
      "Executive (2+2)": "#0A21C0",
      "Double Deck": "#2c2E3A",
    };
    return `rgba(${hexToRgb(colors[busType] || "#000000")}, ${alpha})`;
  };

  const hexToRgb = (hex) => {
    const match = /^#([a-fA-F0-9]{6})$/.exec(hex);
    if (!match) return [0, 0, 0];
    const [r, g, b] = match[1].match(/.{2}/g).map((x) => parseInt(x, 16));
    return [r, g, b];
  };

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: Object.keys(busTypeSalesData).map((busType) => ({
      label: busType,
      data: busTypeSalesData[busType] || new Array(12).fill(0),
      borderColor: getBusTypeColor(busType),
      backgroundColor: getBusTypeColor(busType, 0.2),
      tension: 0.3,
    })),
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Total Ticket Sales by Bus Type in ${selectedYear}`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Ticket Sales",
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 relative font-poppins">
      <div className="absolute top-0 right-0 mt-4 mr-4">
        {/* Year Selector */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-2 border rounded"
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
