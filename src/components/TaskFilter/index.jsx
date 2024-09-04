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
const TaskFilter = ({
  datechange,
  machineName,
  Selectedoption,
  machineChange,
}) => {
  const [choosenItem, setChoosenItem] = useState({
    Date: false,
    Emoloyee: false,
    Machine: false,
    Status: false,
  });
  console.log(choosenItem);
  const itemChange = (key, value) => {
    setChoosenItem({
      Date: false,
      Employee: false,
      Machine: false,
      Status: false,
      [key]: value,
    });
  };

  return (
    <div className="flex column taskFilter-wrapper gap end">
      <Icon icon={faX} />
      <table>
        <tr>
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
            onClick={datechange}
          />
        </div>
      )}
      {choosenItem.Machine && (
        <div className="flex column end gap-btn">
          <ChooseOption
            name="Machine Name"
            placeholder="machine "
            options={machineName}
            onSelect={Selectedoption}
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
    </div>
  );
};

export default TaskFilter;
