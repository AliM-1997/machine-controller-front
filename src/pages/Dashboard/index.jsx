import React, { useEffect, useState } from "react";
import "./style.css";
import { MachineStatistics } from "../../data/remote/machineStatistics";
const Dashboard = () => {
  const [statistics, setStatistics] = useState([]);
  console.log("statistics", statistics);
  const handleAllStatistics = async () => {
    const data = await MachineStatistics.GetALLStatistics();
    setStatistics(data.statistic);
    console.log("statistic from dashboard", data);
  };

  useEffect(() => {
    handleAllStatistics();
  }, []);
  return <div>hello from Dashboard</div>;
};

export default Dashboard;
