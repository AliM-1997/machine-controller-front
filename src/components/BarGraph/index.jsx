import React, { useEffect, useState } from "react";
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
    case "uptime":
      datasets.push({
        label: "Uptime Hours",
        data: data.map((item) => parseFloat(item.uptimeHours)),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      });
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
        text: "Machine Statistics",
      },
    },
  };

  return (
    <div className="stat-container ">
      <Bar data={chartData} options={options} />;
    </div>
  );
};

export default BarGraph;
