import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { ClearMachine, LoadMachine } from "../../data/redux/machineSlice";
const AddMachine = () => {
  const dispatch = useDispatch();
  const machine = useSelector((global) => global.machine);
  console.log("from slice", machine);
  const [formData, setFormData] = useState({
    name: "",
    serial_number: "",
    status: "active",
    location: "",
    image_path: "",
    description: "",
    last_maintenance: null,
    unit_per_hour: "",
    last_maintenance: "",
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...machine,
      last_maintenance: machine.last_maintenance
        ? new Date(machine.last_maintenance)
        : null,
    }));
  }, [machine]);

  const ChangingFormData = (key, value) => {
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

    if (machine.id) {
      const updateDate = await Machines.UpadateMachine(machine.id, dataToSend);
      if (updateDate) {
        dispatch(LoadMachine(updateDate));
        alert("Machine Updated Successfully");
      }
    } else {
      const createData = await Machines.CreateMachine(dataToSend);
      if (createData) {
        dispatch(LoadMachine(createData));
        alert("Machine Created Successfullty");
      }
    }
  };

  const handleDeleteMachine = async () => {
    if (machine.id) {
      const deleteData = await Machines.DeleteMachine(machine.id);
      if (deleteData) {
        alert("Machine Deleted Successfully");
        dispatch(ClearMachine());
      } else {
        alert("Failed to delete machine. Please try again.");
      }
    } else {
      alert("Machine Not Created!");
    }
  };
  const handleDeleteImage = async () => {
    if (machine.image_path !== null) {
      try {
        await Machines.DeleteImage(machine.id);
        dispatch(LoadMachine(machine));
        alert("Image deleted successfully!");
      } catch (error) {
        console.error("Error deleting image:", error.message);
        alert("Failed To Delete Image.");
      }
    } else {
      alert("No Image Found!");
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
        <div className="flex column gap">
          <h2>
            <Label placeholder="Add/Edit Machine" />
          </h2>
          <div className="flex space-btw image-container">
            <div>
              <DisplayImage
                width="150px"
                height="150px"
                borderRadius="12px"
                url={
                  formData.image_path ? formData.image_path : "path to image"
                }
              />
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
                onClick={handleDeleteImage}
              />
            </div>
          </div>
        </div>

        <div className="flex column gap full-height machine-inputs">
          <div className="flex space-btw full-width">
            <Input
              placeHolder={machine.name || "name"}
              name="Name"
              width="37vw"
              leftIcon={faUser}
              type="text"
              onChange={(e) => {
                ChangingFormData("name", e.target.value);
              }}
            />
            <Input
              leftIcon={faAt}
              placeHolder={machine.serial_number || "serial number"}
              name="Serial Number"
              width="37vw"
              type="text"
              onChange={(e) => {
                ChangingFormData("serial_number", e.target.value);
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
                ChangingFormData("unit_per_hour", e.target.value);
              }}
            />
            <Input
              textColor="white"
              leftIcon={faAngleDown}
              placeHolder={machine.status || "pending"}
              iconColor="black"
              width="37vw"
              name="Status"
              type="text"
              onChange={(e) => {
                ChangingFormData("status", e.target.value);
              }}
            />
          </div>

          <div className="full-width">
            <Input
              placeHolder={machine.location || "location"}
              name="Location"
              leftIcon={faLocation}
              type="text"
              onChange={(e) => {
                ChangingFormData("location", e.target.value);
              }}
            />
          </div>
          <div className="full-width">
            <Input
              placeHolder={machine.description || "description"}
              name="machine Description"
              leftIcon={faClipboard}
              type="text"
              onChange={(e) => {
                ChangingFormData("description", e.target.value);
              }}
            />
          </div>
          <div className="full-width">
            <ReactDate
              leftIcon={faCalendarDays}
              name="Last Maintenance"
              placeHolder={
                formData.last_maintenance
                  ? formData.last_maintenance.toISOString().slice(0, 10)
                  : "dd/MM/yyyy"
              }
              onChange={(e) => ChangingFormData("last_maintenance", e)}
            />
          </div>

          <div className="flex end gap">
            <Button
              placeHolder="Delete"
              width="10vw"
              backgroundColor="primary"
              textColor="white"
              onClick={handleDeleteMachine}
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
      </div>
    </div>
  );
};

export default AddMachine;
