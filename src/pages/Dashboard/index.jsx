import React, { useEffect, useState } from "react";
import BarGraph from "../../components/BarGraph"; // Reusable BarGraph component
import { MachineStatistics } from "../../data/remote/machineStatistics";
import Header from "../../components/Header";

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
    <div>
      <Header />
      <div className="flex center column gap">
        <h2>Machine Statistics Dashboard</h2>
        <div>
          <div className="flex space-around gap">
            <div className="">
              <BarGraph
                data={statistics}
                type="uptime_downtime"
                title="Uptime and Downtime Hours"
              />
            </div>
            <div className="">
              <BarGraph
                data={statistics}
                type="operationalTime"
                title="Operation Time"
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
