import React from "react";
import "./style.css";
import Icon from "../../base/Icon";
import { faCalendarAlt, faX } from "@fortawesome/free-solid-svg-icons";
import ReactDate from "../../base/ReactDate";
import Label from "../../base/Label";
import Button from "../../base/Button";
const TaskFilter = ({ datechange }) => {
  return (
    <div className="flex column taskFilter-wrapper gap end">
      <Icon icon={faX} />
      <table>
        <tr>
          <th>Date</th>
          <th>Emploayee</th>
          <th>Ticket</th>
          <th>Status</th>
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
