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
const TaskFilter = ({
  Exitfilter,
  selectMachine,
  selectStatus,
  EmployeeName,
  dateChange,
  EmployeeChange,
  StatusChange,
  machineChange,
}) => {
  const state = useSelector((global) => global);

  const [choosenItem, setChoosenItem] = useState({
    Date: false,
    Emoloyee: false,
    Machine: false,
    Status: false,
  });
  const itemChange = (key, value) => {
    setChoosenItem({
      Date: false,
      Employee: false,
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
    <div className="flex column taskFilter-wrapper gap end">
      <Icon icon={faX} onClick={Exitfilter} />
      <table>
        <tr className="flex gap">
          <th
            className={choosenItem.Date ? "underline" : ""}
            onClick={() => itemChange("Date", true)}
          >
            Date
          </th>
          <th
            className={choosenItem.Employee ? "underline" : ""}
            onClick={() => itemChange("Employee", true)}
          >
            Employee
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
          />

          <Button
            placeHolder="Submit"
            textColor="white"
            backgroundColor="primary"
            onClick={dateChange}
          />
        </div>
      )}
      {choosenItem.Machine && (
        <div className="flex column end gap-btn">
          <ChooseOption
            name="Machine Name"
            placeholder="machine "
            options={state.data.MachineNames}
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
      {choosenItem.Employee && (
        <div className="flex column end gap-btn">
          <ChooseOption
            name="Employee Name"
            placeholder="Employee "
            options={EmployeeName}
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
            onClick={EmployeeChange}
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
