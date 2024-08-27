import React from "react";
import "./style.css";
import Label from "../../base/Label";
import Icon from "../../base/Icon";
import {
  faAngleDown,
  faAngleLeft,
  faCalendarDays,
  faGear,
  faLocation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../../base/Input";
import Date from "../../base/ReactDate";
const AddTask = () => {
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
          name="Machine"
          placeHolder="choose machine "
          leftIcon={faGear}
          rightIcon={faAngleDown}
          width="37vw"
          type="text"
        />
        <Input
          name="user"
          placeHolder="choose user"
          leftIcon={faUser}
          rightIcon={faAngleDown}
          width="37vw"
          type="text"
        />
      </div>
      <div className="flex row center space-btw full-width">
        <Date leftIcon={faCalendarDays} width="37vw" name="Assigned Date" />
        <Date leftIcon={faCalendarDays} width="37vw" name="Due Date" />
      </div>
      <div className="full-width">
        <Input
          placeHolder="location"
          name="Location"
          leftIcon={faLocation}
          type="text"
        />
      </div>
      <div></div>
    </div>
  );
};

export default AddTask;
