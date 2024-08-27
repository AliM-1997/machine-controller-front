import React from "react";
import "./style.css";
import Label from "../../base/Label";
import Icon from "../../base/Icon";
import {
  faAngleDown,
  faAngleLeft,
  faGear,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../../base/Input";
const AddTask = () => {
  return (
    <div className="flex column gap addTask-container">
      <div className="flex space-btw">
        <h2>
          <Label placeholder="Add/Edit Task" fontWeight="bold" />
        </h2>
        <Icon icon={faAngleLeft} />
      </div>
      <div className="flex center gap full-width">
        <Input
          placeHolder="choose machine "
          leftIcon={faGear}
          rightIcon={faAngleDown}
          width="37vw"
        />
        <Input
          placeHolder="choose user"
          leftIcon={faUser}
          rightIcon={faAngleDown}
          width="37vw"
        />
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default AddTask;
