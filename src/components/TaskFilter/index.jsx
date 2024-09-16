import React, { useState } from "react";
import "./style.css";
import Icon from "../../base/Icon";
import {
  faCalendarAlt,
  faSearch,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import ReactDate from "../../base/ReactDate";
import Button from "../../base/Button";
import ChooseOption from "../../base/ChooseOption";
import { useSelector } from "react-redux";
import { useDarkMode } from "../../data/constext/DarkModeContext";
const TaskFilter = ({
  Exitfilter,
  selectMachine,
  selectStatus,
  selectDate,
  selectUsername,
  DateChange,
  StatusChange,
  machineChange,
  UsernameChange,
}) => {
  const { darkMode } = useDarkMode();
  const state = useSelector((global) => global);

  const [choosenItem, setChoosenItem] = useState({
    Date: true,
    UserName: false,
    Machine: false,
    Status: false,
  });
  const itemChange = (key, value) => {
    setChoosenItem({
      Date: false,
      UserName: false,
      Machine: false,
      Status: false,
      [key]: value,
    });
  };
  const statusOption = [
    { label: "Risked" },
    { label: "Completed" },
    { label: "Pending" },
    { label: "Delayed" },
    { label: "In Progress" },
  ];
  return (
    <div
      className={`flex column taskFilter-wrapper gap end ${
        darkMode ? "#0000" : "secondary-bg"
      }`}
      style={{ backgroundColor: darkMode ? "tertiary-bg" : "secondary-bg" }}
    >
      <Icon
        icon={faX}
        onClick={Exitfilter}
        color={darkMode ? "white" : "black"}
      />
      <table>
        <tr className="flex gap">
          <th
            className={choosenItem.Date ? "underline" : ""}
            onClick={() => itemChange("Date", true)}
          >
            Date
          </th>
          <th
            className={choosenItem.UserName ? "underline" : ""}
            onClick={() => itemChange("UserName", true)}
          >
            Username
          </th>
          <th
            className={choosenItem.Machine ? "underline" : ""}
            onClick={() => itemChange("Machine", true)}
          >
            Machine
          </th>
          <th
            className={choosenItem.Status ? "underline" : ""}
            onClick={() => itemChange("Status", true)}
          >
            Status
          </th>
        </tr>
      </table>
      {choosenItem.Date && (
        <div className="flex column end gap-btn">
          <ReactDate
            leftIcon={faCalendarAlt}
            required={false}
            width="25vw"
            name="Date"
            onChange={selectDate}
            mindata={false}
          />

          <Button
            placeHolder="Submit"
            textColor="white"
            backgroundColor="primary"
            onClick={DateChange}
          />
        </div>
      )}
      {choosenItem.Machine && (
        <div className="flex column end gap-btn">
          <ChooseOption
            name="Machine Serial Number"
            placeholder="machine "
            options={state.data.MachineSerialNumber}
            onSelect={selectMachine}
            width="25vw"
            textColor="black"
            leftIcon={faSearch}
            required={false}
          />
          <Button
            placeHolder="Submit"
            textColor="white"
            backgroundColor="primary"
            onClick={machineChange}
          />
        </div>
      )}
      {choosenItem.UserName && (
        <div className="flex column end gap-btn">
          <ChooseOption
            name="Username"
            placeholder="UserName "
            options={state.data.UserNames}
            onSelect={selectUsername}
            width="25vw"
            textColor="black"
            leftIcon={faSearch}
            required={false}
          />
          <Button
            placeHolder="Submit"
            textColor="white"
            backgroundColor="primary"
            onClick={UsernameChange}
          />
        </div>
      )}
      {choosenItem.Status && (
        <div className="flex column end gap-btn">
          <ChooseOption
            name="Status"
            placeholder="status "
            options={statusOption}
            onSelect={selectStatus}
            width="25vw"
            textColor="black"
            leftIcon={faSearch}
            required={false}
          />
          <Button
            placeHolder="Submit"
            textColor="white"
            backgroundColor="primary"
            onClick={StatusChange}
          />
        </div>
      )}
    </div>
  );
};

export default TaskFilter;
