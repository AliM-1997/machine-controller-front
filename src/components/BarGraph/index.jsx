import React from "react";
import { Bar } from "react-chartjs-2";
import "./style.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarGraph = ({ data, type }) => {
  const labels = data.map((item) => item.date);
  let datasets = [];

  switch (type) {
    case "uptime_downtime":
      datasets.push(
        {
          label: "Uptime",
          data: data.map((item) => parseFloat(item.uptimeHours)),
          backgroundColor: "rgba(0, 255, 0, 1)",
          borderWidth: 1,
          borderRadius: 6,
        },
        {
          label: "Downtime",
          data: data.map((item) => parseFloat(item.downtime)),
          backgroundColor: "rgba(255, 0, 0, 1)",
          borderWidth: 1,
          borderRadius: 6,
        }
      );
      break;
    case "operationalTime":
      datasets.push({
        label: "Operational Time",
        data: data.map((item) => parseFloat(item.operationalTime)),
        backgroundColor: "rgba(0, 0, 255, 1)",
        borderWidth: 6,
      });
      break;
    default:
      break;
  }
  case

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Machine Statistics",
      },
    },
  };

  return (
    <div className="stat-container">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarGraph;
