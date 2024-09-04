import React, { useState } from "react";
import "./style.css";
import Icon from "../../base/Icon";
import { faCalendarAlt, faX } from "@fortawesome/free-solid-svg-icons";
import ReactDate from "../../base/ReactDate";
import Button from "../../base/Button";
const TaskFilter = ({ datechange }) => {
  const [choosenItem, setChoosenItem] = useState({
    Date: false,
    Emoloyee: false,
    Ticket: false,
    Status: false,
  });
  console.log(choosenItem);
  const itemChange = (key, value) => {
    setChoosenItem({
      Date: false,
      Employee: false,
      Ticket: false,
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
            className={choosenItem.Emoloyee ? "underline" : ""}
            onClick={() => itemChange("Employee", true)}
          >
            Employee
          </th>
          <th
            className={choosenItem.Ticket ? "underline" : ""}
            onClick={() => itemChange("Ticket", true)}
          >
            Ticket
          </th>
          <th
            className={choosenItem.Status ? "underline" : ""}
            onClick={() => itemChange("Status", true)}
          >
            Status
          </th>
        </tr>
      </table>
      <div className="flex column end gap">
        <>
          <ReactDate
            leftIcon={faCalendarAlt}
            required={false}
            width="25vw"
            name="Date"
          />
        </>

        <Button
          placeHolder="Submit"
          textColor="white"
          backgroundColor="primary"
          onClick={datechange}
        />
      </div>
    </div>
  );
};

export default TaskFilter;
