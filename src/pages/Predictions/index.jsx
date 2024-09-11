import React, { useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import PredictionCard from "../../components/PredictionCard";
import ChooseOption from "../../base/ChooseOption";
import { useSelector } from "react-redux";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Predictions = () => {
  const machine = useSelector((global) => global.data);
  const [serialNumber, setSerialnumber] = useState("");
  console.log(serialNumber);
  console.log(machine);
  const handleOptionSelect = (option) => {
    setSerialnumber(option);
  };
  return (
    <div>
      <Header showChooseInput={false} pageName={"Predictions"} />
      <div>
        <ChooseOption
          name={"Machine "}
          placeholder="Serial Number"
          options={machine.MachineSerialNumber}
          backgroundColor="white"
          width="12vw"
          leftIcon={faSearch}
          iconColor="white"
          required={false}
          onSelect={(option) => handleOptionSelect(option.label)}
        />
        <PredictionCard serial_number={serialNumber} />
      </div>
    </div>
  );
};

export default Predictions;
