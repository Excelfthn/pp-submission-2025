"use client";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

export default function PaceChart({ timeSeries = [] }) {
  const labels = timeSeries.map((point) => point.time);
  const wpmData = timeSeries.map((point) => point.wpm);

  const data = {
    labels,
    datasets: [
      {
        label: "Words Per Minute",
        data: wpmData,
        fill: false,
        borderColor: "#9b59b6",
        backgroundColor: "#9b59b6",
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
            yMax: 60,
            backgroundColor: "rgba(128, 128, 128, 0.4)",
          },
          mediumZone: {
            type: "box",
            yMin: 60,
            yMax: 140,
            backgroundColor: "rgba(176, 176, 176, 0.4)",
          },
          highZone: {
            type: "box",
            yMin: 140,
            yMax: 200,
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
        max: 200,
        ticks: {
          stepSize: 3,
          autoSkip: false,
          callback: function (value) {
            if (value === 0) return "Low";
            if (value === 200) return "High";
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
