"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineChart({ xpData = [] }) {
  console.log("this is xpData", xpData);

  // Sort by date just in case
  const sortedData = [...xpData].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Format date to day of week: Mon, Tue, ...
  const labels = sortedData.map((item) =>
    new Date(item.date).toLocaleDateString("en-GB", {
      weekday: "short",
    })
  );

  const dataPoints = sortedData.map((item) => item.xp);

  const data = {
    labels,
    datasets: [
      {
        label: "Weekly XP",
        data: dataPoints,
        fill: true,
        borderColor: "#0055B2",
        backgroundColor: "rgba(0, 85, 178, 0.1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        grid: {
          display: true,
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
}
