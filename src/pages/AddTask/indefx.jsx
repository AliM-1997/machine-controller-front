import React from "react";
import "./style.css";
import Label from "../../base/Label";
import Icon from "../../base/Icon";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
const AddTask = () => {
  return (
    <div className="flex column gap addTask-container">
      <div className="flex space-btw">
        <h2>
          <Label placeholder="Add/Edit Task" fontWeight="bold" />
        </h2>
        <Icon icon={faAngleLeft} />
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default AddTask;
