import React from "react";
import "./style.css";
import { MachineStatistics } from "../../data/remote/machineStatistics";
const Dashboard = () => {
  const handleAllStatistics = async () => {
    const data = await MachineStatistics.GetALLStatistics();
    console.log("statistic from dashboard", data);
  };
  handleAllStatistics();
  return <div>hello from Dashboard</div>;
};

export default Dashboard;
