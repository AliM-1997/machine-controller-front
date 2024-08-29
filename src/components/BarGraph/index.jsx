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

const BarGraph = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Simulate fetching data or processing it
    const data = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          label: "MTTR",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };
    setChartData(data);
  }, []);

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
