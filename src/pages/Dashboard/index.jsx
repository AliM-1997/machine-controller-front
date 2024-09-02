import React, { useEffect, useState } from "react";
import BarGraph from "../../components/BarGraph";
import { MachineStatistics } from "../../data/remote/machineStatistics";
import Header from "../../components/Header";
import Button from "../../base/Button";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStatByMachineName = async () => {
    setLoading(true);
    const response = await MachineStatistics.GetStatisticByMachineName(
      formData.machine_name
    );
    if (response && response.statistics) {
      setStatistics([response.statistics]);
    } else {
      setStatistics([]);
    }
    setLoading(false);
  };

  const handleGetStatByNameAndDate = async () => {
    setLoading(true);
    const response = await MachineStatistics.GetStatisticByNameAndDate(
      formData.machine_name,
      formData.date
    );
    if (response && response.statistics) {
      setStatistics([response.statistics]);
    } else {
      setStatistics((prevform) => prevform);
    }
    setLoading(false);
  };

  const handleGetStatBetweenDate = async () => {
    setLoading(true);
    const response = await MachineStatistics.GetStatisticBetweenDate(
      formData.machine_name,
      formData.startDate,
      formData.endDate
    );

    if (response && response.statistics) {
      setStatistics([response.statistics]);
      setShowFilter(false);
    } else {
      clearFilterState();
      setStatistics((prevform) => prevform);
    }
    setLoading(false);
  };
  const ChangingFormat = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
    if (key === "machine_name" && value !== "") {
      setError("");
    }
  };

  const handleFilterClick = () => {
    if (formData.machine_name === "") {
      setError("Please select a machine name before applying filters.");
      return;
    }
    setError("");
    setShowFilter(true);
  };

  useEffect(() => {
    if (formData.machine_name !== "") handleStatByMachineName();
  }, [formData.machine_name]);

  const handleOptionSelect = (name, option) => {
    ChangingFormat(name, option.label);
  };

  const clearFilterState = () => {
    setFormData({
      machine_name: formData.machine_name,
      date: null,
      startDate: null,
      endDate: null,
    });
    setError("");
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
          </div>
          {error && <div className="error-message">{error}</div>}
          <Button
            placeHolder="filter"
            backgroundColor="primary"
            width="5vw"
            textColor="white"
            onClick={handleFilterClick}
          />
          {showFilter && (
            <DashboardFilter
              onExit={() => {
                setShowFilter(false);
                clearFilterState();
              }}
              dateChange={(e) => ChangingFormat("date", e)}
              filter1={handleGetStatByNameAndDate}
              date_1_Change={(e) => ChangingFormat("startDate", e)}
              date_2_change={(e) => ChangingFormat("endDate", e)}
              filter2={handleGetStatBetweenDate}
            />
          )}
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="flex space-around gap">
              <BarGraph
                datas={statistics}
                type="uptime_downtime"
                title="Uptime and Downtime Hours"
              />
              <BarGraph
                datas={statistics}
                type="operationalTime"
                title="Operation Time"
              />
            </div>
            <div className="flex space-around gap">
              <BarGraph
                datas={statistics}
                type="MTBF_MTTR_MTTD"
                title="MTBF, MTTR, MTTD"
              />
              <BarGraph
                datas={statistics}
                type="efficiency_availability"
                title="Efficiency and Availability"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
