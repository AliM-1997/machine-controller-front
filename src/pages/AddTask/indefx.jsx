import React from "react";
import "./style.css";
import Label from "../../base/Label";
const AddTask = () => {
  return (
    <div className="flex column gap addTask-container">
      <div>
        <h2>
          <Label placeholder="Add/Edit Task" fontWeight="bold" />
        </h2>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default AddTask;
