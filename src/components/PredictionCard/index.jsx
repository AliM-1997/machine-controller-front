import React, { useEffect, useState } from "react";
import Button from "../../base/Button";
import Papa from "papaparse";
import { Machines } from "../../data/remote/Machine";
import { MachineStatistics } from "../../data/remote/machineStatistics";
import { useDarkMode } from "../../data/constext/DarkModeContext";
import Label from "../../base/Label";
import "./style.css";
import { useNavigate } from "react-router-dom";
const PredictionCard = ({ serial_number }) => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [csvData, setCsvData] = useState(null);
  const [displaySparepart, setDisplaySparePart] = useState([]);
  console.log(displaySparepart);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          setCsvData(results.data);
        },
        header: true,
      });
    }
  };

  const handleAllSparePart = async () => {
    if (serial_number) {
      try {
        const data = await Machines.GetallSparepartForMachine(serial_number);
        console.log(data);
        setDisplaySparePart(data);
      } catch (error) {
        console.error("Error fetching all spare parts:", error.message);
      }
    }
  };
  const handleCreateStatistic = async () => {
    if (csvData !== "") {
      const response =
        await MachineStatistics.CreateMachineStatisticCalculation(csvData);
      console.log("from component", response);
      setCsvData(null);
    }
  };

  const getMaintenanceStatus = (sparePart) => {
    if (displaySparepart.machine) {
      const operatingTime = parseFloat(displaySparepart.machine.operating_time);
      const lifecycle = parseFloat(sparePart.life_cycle);

      if (lifecycle) {
        const differencePercentage =
          ((operatingTime - lifecycle) / lifecycle) * 100;

        if (differencePercentage >= 90) {
          return "Risk: Exceed Life Time";
        } else if (differencePercentage >= 50) {
          return "Preventive maintenance required.";
        }
      }
    }
    return "";
  };

  const handleAssignedTask = () => {};

  useEffect(() => {
    if (csvData) {
      handleCreateStatistic();
    }
  }, [csvData]);

  useEffect(() => {
    handleAllSparePart();
  }, [serial_number]);
  return (
    <div className=" flex column gap end">
      <div>
        <Button
          placeHolder="Statistics"
          backgroundColor="primary"
          textColor="white"
          onClick={() => document.getElementById("csvInput").click()}
        />
        <input
          id="csvInput"
          type="file"
          accept=".csv"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
      <div
        className={`"flex column padding-30px spare-part-status full-width ${
          darkMode ? "black-bg" : "white-bg"
        }`}
      >
        <h3>
          <Label
            placeholder={"Spare Parts "}
            backgroundColor={darkMode ? "balck-bg" : "white-bg"}
            textColor={darkMode ? "white" : "black"}
          />
        </h3>
        <div
          className={`flex column `}
          style={{
            color: darkMode ? "white" : "black",
            backgroundColor: darkMode ? "black" : "white",
          }}
        >
          {displaySparepart.spare_parts &&
          displaySparepart.spare_parts.length > 0 ? (
            <ul className="flex gap">
              {displaySparepart.spare_parts.map((sparePart, index) => (
                <li
                  key={index}
                  className={`spare-part-card-prediction flex column ${
                    darkMode ? "tertiary-bg" : "secondary-bg"
                  }`}
                >
                  <div className="flex space-btw">
                    {sparePart.serial_number}
                    <div className="assign-task"> Task</div>
                  </div>
                  <div>{getMaintenanceStatus(sparePart)}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No spare parts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;
