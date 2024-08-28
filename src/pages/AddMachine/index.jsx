import React from "react";
import "./style.css";
import Header from "../../components/Header";
import Label from "../../base/Label";
import Button from "../../base/Button";
import DisplayImage from "../../base/DisplayImage";
import Input from "../../base/Input";
import {
  faAngleDown,
  faAt,
  faHashtag,
  faN,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import DropButton from "../../base/DropButton";
const AddMachine = () => {
  const options = [
    {
      label: "Add Machine",
      url: "/addmachine",
    },
  ];
  return (
    <div>
      <Header pageName="Machines" options={options} />
      <div className="flex column full-width addMachine-container gap">
        <h2>
          <Label placeholder="Add/Edit Machine" />
        </h2>
        <div className="flex space-btw image-container">
          <div>
            <DisplayImage width="150px" height="150px" borderRadius="12px" />
          </div>
          <div className="flex gap">
            <Button
              placeHolder="Upload Image"
              width="10vw"
              backgroundColor="primary"
              textColor="white"
            />
            <Button
              placeHolder="Delete"
              width="8vw"
              backgroundColor="primary"
              textColor=" white"
            />
          </div>
        </div>
        <div className="flex space-btw full-width">
          <Input
            placeHolder="name"
            name="Name"
            width="37vw"
            leftIcon={faUser}
            type="text"
          />
          <Input
            leftIcon={faAt}
            placeHolder="serial number"
            name="Serial Number"
            width="37vw"
            type="text"
          />
        </div>
        <div className="flex space-btw full-width">
          <Input
            name="Units Per Hour"
            width="37vw"
            leftIcon={faHashtag}
            type="text"
          />
          <Input
            textColor="white"
            leftIcon={faAngleDown}
            iconColor="black"
            width="37vw"
            name="Status"
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export default AddMachine;
