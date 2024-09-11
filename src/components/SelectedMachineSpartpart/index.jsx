import React from "react";
import ChooseOption from "../../base/ChooseOption";
import { useSelector } from "react-redux";
import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import Button from "../../base/Button";
import { useDarkMode } from "../../data/constext/DarkModeContext";
import "./style.css";
import Icon from "../../base/Icon";
import Label from "../../base/Label";
const SelectedMachineSparePart = ({ onselect, onExit, onAdd }) => {
  const spareParts = useSelector((global) => global.data);
  const { darkMode } = useDarkMode();
  return (
    <div
      className={`flex column gap end padding-30px add-spare-part ${
        darkMode ? "tertiary-bg" : "white"
      }`}
    >
      <dic className="flex space-btw full-width">
        <h3>
          <Label
            placeholder={"Spare Part Serial Number"}
            backgroundColor={darkMode ? "tertiary" : "white"}
            textColor={darkMode ? "white" : "black"}
          />
        </h3>
        <Icon
          icon={faX}
          color={darkMode ? "white" : "black"}
          onClick={onExit}
        />
      </dic>
      <ChooseOption
        options={spareParts.SparePartSerialNumber}
        backgroundColor="white"
        width="20vw"
        leftIcon={faSearch}
        iconColor="white"
        required={false}
        onSelect={onselect}
      />
      <Button
        backgroundColor="primary"
        placeHolder="Add"
        textColor="white"
        onClick={onAdd}
      />
    </div>
  );
};

export default SelectedMachineSparePart;
