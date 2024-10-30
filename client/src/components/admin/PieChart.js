import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  // Sample data for ticket sales by bus type
  const data = {
    labels: ["Executive", "Executive", "Double Deck (Upper Deck)"],
    datasets: [
      {
        label: "Ticket Sales by Bus Type",
        data: [30, 50, 20], // Percentage or actual ticket sales numbers
        backgroundColor: [
          "rgba(10, 33, 192, 0.6)", // Executive (24 Seats) color
          "rgba(44, 46, 58, 0.6)", // Executive (40 Seats) color
          "rgba(5, 10, 68, 0.6)", // Double Deck (Upper Deck) color
        ],
        borderColor: ["#0A21C0", "#2c2E3A", "#050A44"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 30, // Adjust padding to make space for title and legend
      },
    },
    plugins: {
      legend: {
        display: true, // Ensure the legend is displayed
        position: "bottom", // Position the legend below the chart
        labels: {
          padding: 20, // Space between legend items
          font: {
            size: 12, // Adjust font size for better visibility
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = data.labels[tooltipItem.dataIndex];
            const value = data.datasets[0].data[tooltipItem.dataIndex];
            return `${label}: ${value}%`;
          },
        },
      },
      title: {
        display: true,
        text: "Ticket Sales by Bus Type",
        font: {
          size: 12, // Increase font size for the title
        },
        padding: {
          bottom: 10, // Add space below the title
        },
      },
    },
  };

  return (
    <div className="w-80 h-80 mx-auto mt-10">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
