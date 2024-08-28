import React from "react";
import "./style.css";
import Header from "../../components/Header";
import Label from "../../base/Label";
import Button from "../../base/Button";
import DisplayImage from "../../base/DisplayImage";
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
      </div>
    </div>
  );
};

export default AddMachine;
