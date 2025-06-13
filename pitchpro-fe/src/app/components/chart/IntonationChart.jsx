"use client";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, annotationPlugin);

export default function IntonationChart({ timeSeries = [] }) {
  const labels = timeSeries.map((point) => point.time);
  const intonationData = timeSeries.map((point) => point.intonation);

  const data = {
    labels,
    datasets: [
      {
        label: "Intonation (Hz)",
        data: intonationData,
        fill: false,
        borderColor: "#4B934B",
        backgroundColor: "#4B934B",
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
            yMax: 120,
            backgroundColor: "rgba(128, 128, 128, 0.4)",
          },
          mediumZone: {
            type: "box",
            yMin: 120,
            yMax: 220,
            backgroundColor: "rgba(176, 176, 176, 0.4)",
          },
          highZone: {
            type: "box",
            yMin: 220,
            yMax: 400,
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
        max: 400,
        ticks: {
          stepSize: 20,
          autoSkip: false,
          callback: function (value) {
            if (value === 0) return "Low";
            if (value === 400) return "High";
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
