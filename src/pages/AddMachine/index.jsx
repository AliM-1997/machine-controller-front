import React, { useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import Label from "../../base/Label";
import Button from "../../base/Button";
import DisplayImage from "../../base/DisplayImage";
import Input from "../../base/Input";
import ReactDate from "../../base/ReactDate";
import {
  faAngleDown,
  faAt,
  faCalendarDays,
  faClipboard,
  faHashtag,
  faLocation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Machines } from "../../data/remote/Machine";
import { Functions } from "../../utils/reusableFunctions";
const AddMachine = () => {
  const [formData, setFormData] = useState({
    name: "",
    serial_number: "",
    status: "active",
    location: "",
    image_path: "",
    description: "",
    last_maintenance: "",
    unit_per_hour: "",
    last_maintenance: "",
  });
  console.log(formData);
  const handleFormData = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  const handleCreateMachine = async () => {
    const dataToSend = {
      ...formData,
      last_maintenance: Functions.ToDateformat(formData.last_maintenance),
    };
    try {
      const data = await Machines.CreateMachine(dataToSend);
      console.log(data);
    } catch (error) {
      console.error("Error creating machine:", error);
    }
  };
  const options = [
    { label: "Add Machine", url: "addmachine" },
    { label: "All Machines", url: "allmachines" },
  ];
  return (
    <div>
      <Header pageName="Machines" options={options} className="container" />
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
            onChange={(e) => {
              handleFormData("name", e.target.value);
            }}
          />
          <Input
            leftIcon={faAt}
            placeHolder="serial number"
            name="Serial Number"
            width="37vw"
            type="text"
            onChange={(e) => {
              handleFormData("serial_number", e.target.value);
            }}
          />
        </div>
        <div className="flex space-btw full-width">
          <Input
            name="Units Per Hour"
            width="37vw"
            leftIcon={faHashtag}
            type="text"
            onChange={(e) => {
              handleFormData("unit_per_hour", e.target.value);
            }}
          />
          <Input
            textColor="white"
            leftIcon={faAngleDown}
            iconColor="black"
            width="37vw"
            name="Status"
            type="text"
            onChange={(e) => {
              handleFormData("status", e.target.value);
            }}
          />
        </div>

        <div className="full-width">
          <Input
            placeHolder={"location"}
            name="Location"
            leftIcon={faLocation}
            type="text"
            onChange={(e) => {
              handleFormData("location", e.target.value);
            }}
          />
        </div>
        <div className="full-width">
          <Input
            placeHolder={"task"}
            name="machine Description"
            leftIcon={faClipboard}
            type="text"
            onChange={(e) => {
              handleFormData("description", e.target.value);
            }}
          />
        </div>
        <div className="full-width">
          <ReactDate
            leftIcon={faCalendarDays}
            name="Last Maintenace"
            placeHolder={
              formData.assignedDate
                ? formData.assignedDate.toISOString().slice(0, 10)
                : "dd/MM/yyyy"
            }
            onChange={(e) => handleFormData("last_maintenance", e)}
          />
        </div>
      </div>
      <div className="flex end gap">
        <Button
          placeHolder="Delete"
          width="10vw"
          backgroundColor="primary"
          textColor="white"
        />
        <Button
          placeHolder="Save"
          backgroundColor="primary"
          width="10vw"
          textColor="white"
          onClick={handleCreateMachine}
        />
      </div>
    </div>
  );
};

export default AddMachine;
