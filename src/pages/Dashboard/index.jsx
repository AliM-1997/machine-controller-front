import React, { useEffect, useState } from "react";
import BarGraph from "../../components/BarGraph";
import { MachineStatistics } from "../../data/remote/machineStatistics";
import Header from "../../components/Header";
import Button from "../../base/Button";
import ReactDate from "../../base/ReactDate";
import { faAngleDown, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import ChooseOption from "../../base/ChooseOption";
import { useSelector } from "react-redux";
import DashboardFilter from "../../components/DashboardFilter";
import "./style.css";

const Dashboard = () => {
  const response = useSelector((global) => global);
  const [showFilter, setShowFilter] = useState(false);
  const [formData, setFormData] = useState({
    machine_name: "",
    date: null,
    startDate: null,
    endDate: null,
  });
  const [statistics, setStatistics] = useState([]);
  console.log("asdaksjdhkasjhdkajds", statistics);

  // const handleAllStatistics = async () => {
  //   const data = await MachineStatistics.GetALLStatistics();
  //   setStatistics(data.statistic);
  // };
  const handleStatByMachineName = async () => {
    const response = await MachineStatistics.GetStatisticByMachineName(
      formData.machine_name
    );
    if (response && response.statistics) {
      setStatistics([response.statistics]);
    } else {
      setStatistics([]);
    }
  };

  const handleGetStatByNameAndDate = async () => {
    try {
      const formattedDate = formData.date
        ? formData.date.toISOString().slice(0, 10)
        : "";
      const data = await MachineStatistics.GetStatisticByNameAndDate(
        formData.machine_name,
        formattedDate
      );
      setStatistics(data.statistics);
    } catch (error) {
      console.error("Error fetching statistics by name and date:", error);
    }
  };

  const ChangingFormat = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  // useEffect(() => {
  //   handleAllStatistics();
  // }, []);
  useEffect(() => {
    if (formData.machine_name !== "") handleStatByMachineName();
  }, [formData.machine_name]);

  const handleOptionSelect = (name, option) => {
    ChangingFormat(name, option.label);
  };

  return (
    <div className="dash-cont">
      <Header pageName={"Dashboard"} />
      <div className="flex center column gap dashboard-container">
        <div className="stat-title">
          <h2>Machine Statistics</h2>
        </div>
        <div className="flex row space-btw stat-input">
          <div className="flex gap">
            <ChooseOption
              options={response.data.MachineNames}
              onSelect={(option) => handleOptionSelect("machine_name", option)}
              placeholder={"search machine"}
              width="20vw"
              textColor="black"
              leftIcon={faAngleDown}
              required={false}
            />
            <ReactDate
              leftIcon={faCalendarAlt}
              mindata={false}
              onChange={(e) => ChangingFormat("date", e)}
            />
          </div>
          <Button
            placeHolder="filter"
            backgroundColor="primary"
            width="5vw"
            textColor="white"
            onClick={() => setShowFilter(true)}
          />
          {showFilter && (
            <DashboardFilter
              onExit={() => setShowFilter(false)}
              dateChange={(e) => ChangingFormat("date", e)}
              filter1={handleGetStatByNameAndDate}
              date_1_Change={(e) => ChangingFormat("startDate", e)}
              date_2_change={(e) => ChangingFormat("endDate", e)}
              filter2={handleGetStatByNameAndDate}
            />
          )}
        </div>
        <div className="flex space-around gap">
          <BarGraph
            data={statistics}
            type="uptime_downtime"
            title="Uptime and Downtime Hours"
          />
          <BarGraph
            data={statistics}
            type="operationalTime"
            title="Operation Time"
          />
        </div>
        <div className="flex space-around gap">
          <BarGraph
            data={statistics}
            type="MTBF_MTTR_MTTD"
            title="MTBF, MTTR, MTTD"
          />
          <BarGraph
            data={statistics}
            type="efficiency_availability"
            title="Efficiency and Availability"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
