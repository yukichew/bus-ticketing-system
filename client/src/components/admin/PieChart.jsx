import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { getTransactionsDetails } from "../../api/transaction";
import { getAllBusTypes } from "../../api/busType";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [salesData, setSalesData] = useState({});
  const [busTypes, setBusTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uniqueBusTypes = await getAllBusTypes();
        setBusTypes(uniqueBusTypes);

        const { transactions } = await getTransactionsDetails();
        const busTypeSales = {};

        uniqueBusTypes.forEach((busType) => {
          busTypeSales[busType] = 0;
        });

        transactions.forEach((transaction) => {
          const busType = transaction.types;
          const amount = transaction.amount;

          if (busTypeSales[busType] !== undefined) {
            busTypeSales[busType] += amount;
          }
        });

        setSalesData(busTypeSales);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: busTypes,
    datasets: [
      {
        label: "Ticket Sales by Bus Type",
        data: busTypes.map((busType) => salesData[busType] || 0),
        backgroundColor: busTypes.map((_, index) => {
          const colors = [
            "rgba(10, 33, 192, 0.6)",
            "rgba(44, 46, 58, 0.6)",
            "rgba(5, 10, 68, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ];
          return colors[index % colors.length];
        }),
        borderColor: busTypes.map((_, index) => {
          const borderColors = [
            "#0A21C0",
            "#2c2E3A",
            "#050A44",
            "#FF5733",
            "#36A2EB",
            "#FF9F40",
          ];
          return borderColors[index % borderColors.length];
        }),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 30,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = data.labels[tooltipItem.dataIndex];
            const value = data.datasets[0].data[tooltipItem.dataIndex];
            return `${label}: $${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-80 h-80 mx-auto mt-10 h-[26rem]">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
