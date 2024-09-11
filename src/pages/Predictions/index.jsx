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
      <div className="flex column gap padding-30px">
        <ChooseOption
          name={"Machine "}
          placeholder="Serial Number"
          options={machine.MachineSerialNumber}
          backgroundColor="white"
          width="20vw"
          leftIcon={faSearch}
          iconColor="white"
          required={false}
          onSelect={(option) => handleOptionSelect(option.label)}
        />
        <div className=" flex column">
          <PredictionCard serial_number={serialNumber} />
        </div>
      </div>
    </div>
  );
};

export default Predictions;
