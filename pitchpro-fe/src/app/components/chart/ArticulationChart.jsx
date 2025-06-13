"use client";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, annotationPlugin);

export default function ArticulationChart({ timeSeries = [] }) {
  const labels = timeSeries.map((point) => point.time);
  const clarityData = timeSeries.map((point) => point.articulation); 

  const data = {
    labels,
    datasets: [
      {
        label: "Articulation Clarity (%)",
        data: clarityData,
        fill: false,
        borderColor: "#2981E0",
        backgroundColor: "#2981E0",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      annotation: {
        annotations: {
          lowZone: {
            type: "box",
            yMin: 0,
            yMax: 35,
            backgroundColor: "rgba(128, 128, 128, 0.4)",
          },
          mediumZone: {
            type: "box",
            yMin: 35,
            yMax: 70,
            backgroundColor: "rgba(176, 176, 176, 0.4)",
          },
          highZone: {
            type: "box",
            yMin: 70,
            yMax: 100,
            backgroundColor: "rgba(224, 224, 224, 0.4)",
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: function (value) {
            if (value === 0) return "Low";
            if (value === 100) return "High";
            return "";
          },
        },
        grid: {
          color: "#ccc",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
