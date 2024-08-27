import React, { useState } from "react";
import "./style.css";
import Label from "../../base/Label";
import Icon from "../../base/Icon";
import {
  faAngleDown,
  faAngleLeft,
  faCalendarDays,
  faClipboard,
  faGear,
  faInfoCircle,
  faLocation,
  faTools,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../../base/Input";
import Date from "../../base/ReactDate";
import Button from "../../base/Button";
import { useSelector } from "react-redux";
const AddTask = () => {
  const task = useSelector((global) => global.task);
  console.log(" from add task", task);
  return (
    <div className="flex column gap addTask-container">
      <div className="flex space-btw">
        <h2>
          <Label placeholder="Add/Edit Task" fontWeight="bold" />
        </h2>
        <Icon icon={faAngleLeft} />
      </div>
      <div className="flex row center space-btw full-width">
        <Input
          name="Machine_id"
          placeHolder={task.machine_id || "choose machine "}
          leftIcon={faGear}
          rightIcon={faAngleDown}
          width="37vw"
          type="text"
        />
        <Input
          name="user_id"
          placeHolder={task.user_id || "choose user"}
          leftIcon={faUser}
          rightIcon={faAngleDown}
          width="37vw"
          type="text"
        />
      </div>
      <div className="flex row center space-btw full-width">
        <Input
          name="Spare Part"
          placeHolder={task.spare_part_id || "choose sparePart "}
          leftIcon={faTools}
          rightIcon={faAngleDown}
          width="37vw"
          type="text"
          required={false}
        />
        <Input
          name="status"
          placeHolder={task.status || "pending"}
          leftIcon={faInfoCircle}
          rightIcon={faAngleDown}
          width="37vw"
          type="text"
        />
      </div>
      <div className="flex row center space-btw full-width">
        <Date
          leftIcon={faCalendarDays}
          width="37vw"
          name="Assigned Date"
          placeHolder={task.assignedDate || "dd/MM/yyyy}"}
        />
        <Date
          leftIcon={faCalendarDays}
          width="37vw"
          name="Due Date"
          placeHolder={task.dueDate || "dd/MM/yyyy"}
        />
      </div>
      <div className="full-width">
        <Input
          placeHolder={task.location || "location"}
          name="Location"
          leftIcon={faLocation}
          type="text"
        />
      </div>
      <div className="full-width">
        <Input
          placeHolder={task.jobDescription || "task"}
          name="Job Description"
          leftIcon={faClipboard}
          type="text"
        />
      </div>
      <div className="flex end gap">
        <Button
          placeHolder="Delete"
          width="10vw"
          backgroundColor="primary"
          textColor="white"
        />
        <Button
          placeHolder="save"
          backgroundColor="primary"
          width="10vw"
          textColor="white"
        />
      </div>
    </div>
  );
};

export default AddTask;
