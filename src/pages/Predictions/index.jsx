import React, { useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import PredictionCard from "../../components/PredictionCard";
import ChooseOption from "../../base/ChooseOption";
import { useSelector } from "react-redux";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Label from "../../base/Label";
import { useDarkMode } from "../../data/constext/DarkModeContext";
const Predictions = () => {
  const { darkMode } = useDarkMode();
  const machine = useSelector((global) => global.data);
  const [serialNumber, setSerialnumber] = useState("");
  // console.log(serialNumber);
  // console.log(machine);
  const handleOptionSelect = (option) => {
    setSerialnumber(option);
  };
  return (
    <div>
      <Header showChooseInput={false} pageName={"Predictions"} />
      <div className="flex column gap padding-30px">
        <h2>
          <Label
            placeholder={"Predictions and Recomndations"}
            backgroundColor={darkMode ? "black-bg" : "white-bg"}
            textColor={darkMode ? "white" : "black"}
          />
        </h2>
        <ChooseOption
          placeholder="Serial Number"
          options={machine.MachineSerialNumber}
          backgroundColor="white"
          width="20vw"
          leftIcon={faSearch}
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
