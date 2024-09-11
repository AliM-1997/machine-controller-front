import React, { useEffect, useState } from "react";
import Button from "../../base/Button";
import Papa from "papaparse";
import { Machines } from "../../data/remote/Machine";
import { MachineStatistics } from "../../data/remote/machineStatistics";

const PredictionCard = ({ serial_number }) => {
  const [csvData, setCsvData] = useState(null);
  const [displaySparepart, setDisplaySparePart] = useState([]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          setCsvData(results.data);
          //   console.log("Parsed CSV Data:", results.data[0]);
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
        setDisplaySparePart(data.spare_parts);
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
  useEffect(() => {
    if (csvData) {
      handleCreateStatistic();
    }
  }, [csvData]);
  useEffect(() => {
    handleAllSparePart();
  }, [serial_number]);
  return (
    <div className="">
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
    </div>
  );
};

export default PredictionCard;
