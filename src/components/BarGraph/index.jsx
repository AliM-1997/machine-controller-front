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

const BarGraph = ({ data = [], type, title, label }) => {
  const labels = data.map((item) => item.date || "No Date");
  let datasets = [];

  switch (type) {
    case "uptime_downtime":
      datasets.push(
        {
          label: "Uptime",
          data: data.map((item) => parseFloat(item.uptimeHours) || 0),
          backgroundColor: "rgba(0, 255, 0, 1)",
          borderRadius: 6,
        },
        {
          label: "Downtime",
          data: data.map((item) => parseFloat(item.downtime) || 0),
          backgroundColor: "rgba(255, 0, 0, 1)",
          borderRadius: 6,
        }
      );
      break;
    case "operationalTime":
      datasets.push({
        label: "Operational Time",
        data: data.map((item) => parseFloat(item.operationalTime) || 0),
        backgroundColor: "rgba(0, 0, 255, 1)",
        borderRadius: 6,
      });
      break;
    case "MTBF_MTTR_MTTD":
      datasets.push(
        {
          label: "MTBF",
          data: data.map((item) => parseFloat(item.MTBF) || 0),
          backgroundColor: "rgba(0, 255, 0, 1)",
          borderRadius: 6,
        },
        {
          label: "MTTR",
          data: data.map((item) => parseFloat(item.MTTR) || 0),
          backgroundColor: "rgba(255, 0, 0, 1)",
          borderRadius: 6,
        },
        {
          label: "MTTD",
          data: data.map((item) => parseFloat(item.MTTD) || 0),
          backgroundColor: "rgba(255, 255, 0, 1)",
          borderRadius: 6,
        }
      );
      break;
    case "efficiency_availability":
      datasets.push(
        {
          label: "Efficiency",
          data: data.map((item) => parseFloat(item.efficiency) || 0),
          backgroundColor: "rgba(255, 0, 0, 1)",
          borderRadius: 6,
        },
        {
          label: "Availability",
          data: data.map((item) => parseFloat(item.availability) || 0),
          backgroundColor: "rgba(0, 255, 0, 1)",
          borderRadius: 6,
        }
      );
      break;
    default:
      break;
  }

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
        text: title,
        padding: {
          top: 10,
          bottom: 30,
        },
        position: "top",
        align: "start",
        font: {
          weight: "bold",
          size: 16,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: true,
        },
      },
      y: {
        grid: {
          display: true,
          borderColor: "rgba(0, 0, 0, 0.2)",
        },
      },
    },
  };

  return (
    <div className="stat-container">
      <h3>{label}</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};
export default BarGraph;
