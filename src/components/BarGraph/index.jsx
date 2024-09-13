import React from "react";
import { Bar } from "react-chartjs-2";
import "./style.css";
import { format } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDarkMode } from "../../data/constext/DarkModeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarGraph = ({ datas = [], type, title, label }) => {
  const { darkMode } = useDarkMode();
  const data = Array.isArray(datas[0]) ? datas[0] : datas;
  const labels = data.map((item) =>
    format(new Date(item.date || item.created_at), "dd-MM-yyyy")
  );
  let datasets = [];

  switch (type) {
    case "Predictions Probability":
      datasets.push(
        {
          label: "Heat",
          data: data.map(
            (item) => parseFloat(item.Heat_Dissipation_Failure) || 0
          ),
          backgroundColor: "rgba(255, 0, 0, 1)",
          borderRadius: 6,
          barThickness: 6,
        },
        {
          label: "Strain",
          data: data.map((item) => parseFloat(item.Overstrain_Failure) || 0),
          backgroundColor: "rgba(255, 255, 0, 1)",
          borderRadius: 6,
          barThickness: 6,
        },
        {
          label: "Power",
          data: data.map((item) => parseFloat(item.Power_Failure) || 0),
          backgroundColor: "rgba(0, 0, 255, 1)",
          borderRadius: 6,
          barThickness: 6,
        },
        {
          label: "Tool Wear",
          data: data.map((item) => parseFloat(item.Tool_Wear_Failure) || 0),
          backgroundColor: "rgba( 0, 255, 255, )",
          borderRadius: 6,
          barThickness: 6,
        },
        {
          label: "No Failure",
          data: data.map((item) => parseFloat(item.No_Failure) || 0),
          backgroundColor: "rgba(0, 255, 0, 1)",
          borderRadius: 6,
          barThickness: 6,
        }
      );
      break;
    case "uptime_downtime":
      datasets.push({
        label: "Uptime",
        data: data.map((item) => parseFloat(item.upTime) || 0),
        backgroundColor: "rgba(0, 255, 0, 1)",
        borderRadius: 6,
        barThickness: 6,
      });
      break;
    case "operational_Time_failure":
      datasets.push(
        {
          label: "Operational Time",
          data: data.map((item) => parseFloat(item.operating_time) || 0),
          backgroundColor: "rgba(0, 0, 255, 1)",
          borderRadius: 6,
          barThickness: 6,
        },
        {
          label: "Downtime",
          data: data.map((item) => parseFloat(item.down_time) || 0),
          backgroundColor: "rgba(255, 0, 0, 1)",
          borderRadius: 6,
          barThickness: 6,
        }
      );
      break;
    case "MTBF_MTTR_MTTD":
      datasets.push(
        {
          label: "MTBF",
          data: data.map((item) => parseFloat(item.MTBF) || 0),
          backgroundColor: "rgba(0, 255, 0, 1)",
          borderRadius: 6,
          barThickness: 6,
        },
        {
          label: "MTTR",
          data: data.map((item) => parseFloat(item.MTTR) || 0),
          backgroundColor: "rgba(255, 0, 0, 1)",
          borderRadius: 6,
          barThickness: 6,
        }
        // {
        //   label: "MTTD",
        //   data: data.map((item) => parseFloat(item.MTTD) || 0),
        //   backgroundColor: "rgba(255, 255, 0, 1)",
        //   borderRadius: 6,
        //   barThickness: 6,
        // }
      );
      break;
    case "efficiency_availability":
      datasets.push(
        {
          label: "Efficiency",
          data: data.map((item) => parseFloat(item.efficiency) || 0),
          backgroundColor: "rgba(255, 0, 0, 1)",
          borderRadius: 6,
          barThickness: 6,
        },
        {
          label: "Availability",
          data: data.map((item) => parseFloat(item.availability) || 0),
          backgroundColor: "rgba(0, 255, 0, 1)",
          borderRadius: 6,
          barThickness: 6,
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: darkMode ? "#ffffff" : "#000000",
        },
      },
      title: {
        display: true,
        text: title,
        padding: {
          top: 10,
          bottom: 30,
        },
        color: darkMode ? "#ffffff" : "#000000",
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
          color: darkMode ? "#ffffff" : "#000000",
        },
      },
      y: {
        grid: {
          display: true,
          color: darkMode ? "#ffffff" : "#000000",
        },
      },
    },
  };

  return (
    <div
      className={`stat-container ${darkMode ? "dark-graph" : "light-graph"}`}
    >
      <h3>{label}</h3>
      <Bar data={chartData} options={options} className="bargraph" />
    </div>
  );
};

export default BarGraph;
