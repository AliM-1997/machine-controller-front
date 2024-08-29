import React, { useEffect, useState } from "react";
import BarGraph from "../../components/BarGraph"; // Reusable BarGraph component
import { MachineStatistics } from "../../data/remote/machineStatistics";

const Dashboard = () => {
  const [statistics, setStatistics] = useState([]);

  const handleAllStatistics = async () => {
    const data = await MachineStatistics.GetALLStatistics();
    setStatistics(data.statistic);
  };

  useEffect(() => {
    handleAllStatistics();
  }, []);

  return (
    <div className=" flex column ">
      <h2>Machine Statistics Dashboard</h2>
      <BarGraph data={statistics} type="uptime" />
    </div>
  );
};

export default Dashboard;
