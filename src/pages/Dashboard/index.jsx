import React, { useEffect, useState } from "react";
import BarGraph from "../../components/BarGraph"; // Reusable BarGraph component
import { MachineStatistics } from "../../data/remote/machineStatistics";
import Header from "../../components/Header";
import Label from "../../base/Label";

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
      <div className="flex center column gap dachboard-container">
        <div className="">
          <h2>Machine Statistics</h2>
        </div>
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
        <div>
          <div className="flex space-around gap">
            <div className="">
              <BarGraph
                data={statistics}
                type="MTBF_MTTR_MTTD"
                title="MTBF, MTTR, MTTD"
              />
            </div>
            <div className="">
              <BarGraph
                data={statistics}
                type="efficiency_availability"
                title="Efficiency and Availability"
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
