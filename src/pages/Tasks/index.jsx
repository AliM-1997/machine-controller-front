import React from "react";
import "./style.css";
import Label from "../../base/Label";
import Button from "../../base/Button";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
const Tasks = () => {
  return (
    <div className="flex column  gap task-container">
      <div>
        <h2>
          <Label placeholder="All Tasks" />
        </h2>
      </div>
      <div></div>
      <div>
        <div>
          <div className="flex space-btw white-bg center alltask">
            <div>
              <Label
                placeholder="status"
                fontWeight="bold"
                backgroundColor="white"
              />
            </div>
            <div className="flex center gap">
              <Button
                placeHolder="Date"
                backgroundColor="primary"
                width="10vw"
                textColor="white"
                leftIcon={faAngleDown}
                iconColor="white"
              />
              <Button
                placeHolder="Ticket"
                backgroundColor="primary"
                width="10vw"
                textColor="white"
                leftIcon={faAngleDown}
                iconColor="white"
              />
              <Button
                placeHolder="Status"
                backgroundColor="primary"
                width="10vw"
                textColor="white"
                leftIcon={faAngleDown}
                iconColor="white"
              />
            </div>
          </div>
          <div></div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Tasks;
