import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import Label from "../../base/Label";
import Button from "../../base/Button";
import DisplayImage from "../../base/DisplayImage";
import Input from "../../base/Input";
import ReactDate from "../../base/ReactDate";
import whiteImge from "../../assets/images/white-bg.png";
import { Machines } from "../../data/remote/Machine";
import { Functions } from "../../utils/reusableFunctions";
import { useDispatch, useSelector } from "react-redux";
import { ClearMachine, LoadMachine } from "../../data/redux/machineSlice";
import { useNavigate } from "react-router-dom";
import {
  faAngleDown,
  faAngleRight,
  faAt,
  faCalendarDays,
  faClipboard,
  faHashtag,
  faLocation,
  faTrashCan,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ChooseOption from "../../base/ChooseOption";
import Icon from "../../base/Icon";
import { useDarkMode } from "../../data/constext/DarkModeContext";
const AddMachine = () => {
  const { darkMode } = useDarkMode();
  const response = useSelector((global) => global);
  const [formData, setFormData] = useState({
    name: "",
    serial_number: "",
    status: "active",
    location: "",
    image_path: "",
    description: "",
    last_maintenance: "",
    unit_per_hour: "",
  });
  console.log("formdata add machine", formData);
  const machine = useSelector((global) => global.machine);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ChangingFormData = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...machine,
      last_maintenance: machine.last_maintenance
        ? new Date(machine.last_maintenance)
        : null,
    }));
  }, [machine]);

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
      const createData = await Machines.CreateMachine(formData);
      console.log("testing", createData);
      if (createData) {
        handleUploadImage();
        alert("Machine Created Successfullty");
        allmachineNavigaet();
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
        setImagePreview(null);
        alert("Image deleted successfully!");
      } catch (error) {
        console.error("Error deleting image:", error.message);
        alert("Failed To Delete Image.");
      }
    } else {
      alert("No Image Found!");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUploadImage = async () => {
    if (selectedImage && machine.id !== null) {
      try {
        const image = await Machines.UploadImage(selectedImage, machine.id);
        dispatch(LoadMachine({ ...machine, image_path: image }));
        alert("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error.message);
        alert("Failed to upload image.");
      }
    } else {
      alert("No Selected Image/ not created machine ");
    }
  };
  const HeaderOptions = [
    { label: "Add Machine", url: "addmachine" },
    { label: "All Machines", url: "allmachines" },
  ];
  const statusOption = [
    { label: "active" },
    { label: "under maintenance" },
    { label: "attention" },
  ];
  const handleOptionSelect = (name, option) => {
    ChangingFormData(name, option.label);
  };
  const allmachineNavigaet = () => navigate("/allmachines");
  return (
    <div>
      <Header
        pageName="Machines"
        options={HeaderOptions}
        className="container"
      />
      <div className="flex column full-width addMachine-container gap center">
        <div className="flex column gap ">
          <div className="flex space-btw title ">
            <h2>
              {machine.id ? (
                <Label
                  placeholder={"Edit Machine"}
                  backgroundColor={darkMode ? "terchuery-bg" : "secondary"}
                  textColor={darkMode ? "white" : "black"}
                />
              ) : (
                <Label
                  placeholder={"Add Machine"}
                  backgroundColor={darkMode ? "terchuery-bg" : "secondary"}
                  textColor={darkMode ? "white" : "black"}
                />
              )}
            </h2>
            <div className="flex center">
              <Icon icon={faAngleRight} onClick={allmachineNavigaet} />
            </div>
          </div>
        </div>

        <div className="flex column gap full-height machine-inputs white-bg">
          {machine.id ? (
            <div className="flex column center">
              <div className="machine-image flex center">
                <>
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      className="machineImage"
                      alt="machine"
                    />
                  ) : machine.image_path ? (
                    <DisplayImage
                      width="150px"
                      height="150px"
                      url={machine.image_path}
                    />
                  ) : (
                    <img
                      src={whiteImge}
                      className="machineImage"
                      alt="default"
                    />
                  )}
                </>
              </div>
              <div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="machine-upload1"
                />
              </div>
              <div className="flex space-btw center" style={{ width: "150px" }}>
                <Button
                  placeHolder="Upload Image"
                  backgroundColor="white"
                  textColor="blue"
                  className="mark-read"
                  onClick={handleUploadImage}
                />
                <Icon icon={faTrashCan} onClick={handleDeleteImage} />
              </div>
            </div>
          ) : (
            <div className="flex center">
              <img src={whiteImge} className="machineImage" alt="default" />
            </div>
          )}
          <div className=" flex column gap-btn">
            <div className="flex gap full-width center">
              <Input
                placeHolder={machine.name || "name"}
                name="Name"
                width="24vw"
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
                width="24vw"
                type="text"
                onChange={(e) => {
                  ChangingFormData("serial_number", e.target.value);
                }}
              />
            </div>
            <div className="flex gap full-width center">
              <Input
                name="Units Per Hour"
                placeHolder="number"
                width="24vw"
                leftIcon={faHashtag}
                type="text"
                onChange={(e) => {
                  ChangingFormData("unit_per_hour", e.target.value);
                }}
              />
              <ChooseOption
                options={statusOption}
                onSelect={(option) => handleOptionSelect("status", option)}
                width="24vw"
                textColor="black"
                required={true}
                leftIcon={faAngleDown}
                name="Status"
              />
            </div>

            <div className="flex center ">
              <Input
                placeHolder={machine.location || "location"}
                name="Location"
                leftIcon={faLocation}
                type="text"
                width="calc(48vw + 24px)"
                onChange={(e) => {
                  ChangingFormData("location", e.target.value);
                }}
                required={false}
              />
            </div>
            <div className="flex center ">
              <Input
                placeHolder={machine.description || "description"}
                name="machine Description"
                leftIcon={faClipboard}
                width="calc(48vw + 24px)"
                type="text"
                onChange={(e) => {
                  ChangingFormData("description", e.target.value);
                }}
                required={false}
              />
            </div>
            <div className="flex center space-arr">
              <ReactDate
                leftIcon={faCalendarDays}
                name="Last Maintenance"
                width="calc(48vw + 24px)"
                placeHolder={"dd/MM/yyyy"}
                onChange={(e) => ChangingFormData("last_maintenance", e)}
              />
            </div>
            <div className="flex end gap btn-con">
              <Button
                placeHolder="Delete"
                width="7vw"
                backgroundColor="primary"
                textColor="white"
                onClick={handleDeleteMachine}
              />
              <Button
                placeHolder="Save"
                backgroundColor="primary"
                width="7vw"
                textColor="white"
                onClick={handleCreateMachine}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMachine;
