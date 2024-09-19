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
import { toast } from "react-toastify";
const AddMachine = () => {
  const { darkMode } = useDarkMode();
  const response = useSelector((global) => global);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    serial_number: "",
    status: "",
    location: "",
    image_path: "",
    description: "",
    last_maintenance: "",
    unit_per_hour: "",
  });
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
    }));
  }, [machine]);

  const handleCreateMachine = async () => {
    if (machine.id) {
      const updateDate = await Machines.UpadateMachine(machine.id, formData);
      if (updateDate) {
        alert("Machine Updated Successfully");
      }
    } else {
      if (validateForm()) {
        const createData = await Machines.CreateMachine(formData);
        if (createData) {
          dispatch(ClearMachine());
          toast.success("Machine Created Successfullty");
          allmachineNavigaet();
        }
      }
    }
  };

  const handleDeleteMachine = async () => {
    if (machine.id) {
      const deleteData = await Machines.DeleteMachine(machine.id);
      if (deleteData) {
        toast.success("Machine Deleted Successfully");
        dispatch(ClearMachine());
      } else {
        toast.error("Failed to delete machine. Please try again.");
      }
    } else {
      toast.error("Machine Not Created!");
    }
  };

  const handleDeleteImage = async () => {
    if (machine.image_path !== null) {
      try {
        await Machines.DeleteImage(machine.id);
        setImagePreview(null);
        toast.success("Image deleted successfully!");
      } catch (error) {
        console.error("Error deleting image:", error.message);
        toast.error("Failed To Delete Image.");
      }
    } else {
      toast.error("No Image Found!");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file.");
    }
  };
  const handleUploadImage = async () => {
    if (selectedImage && machine.id !== null) {
      try {
        const image = await Machines.UploadImage(selectedImage, machine.id);
        dispatch(LoadMachine({ ...machine, image_path: image }));
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error.message);
        toast.error("Failed to upload image.");
      }
    } else {
      toast.error("No Selected Image/ not created machine ");
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
  const allmachineNavigaet = () => {
    navigate("/allmachines");
    dispatch(ClearMachine());
  };
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.serial_number)
      newErrors.serial_number = "Serial Number is required.";
    if (!formData.unit_per_hour)
      newErrors.unit_per_hour = "Units Per Hour is required.";
    if (!formData.status) newErrors.status = "status is required.";

    if (!formData.last_maintenance) {
      newErrors.last_maintenance = " last maintenance date required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div>
      <Header
        pageName="Machines"
        options={HeaderOptions}
        className="container"
      />
      <div className="flex column full-width addMachine-container gap center">
        <div className="flex column gap ">
          <div className="flex gap title ">
            <div className="flex center">
              <Icon
                icon={faAngleRight}
                onClick={allmachineNavigaet}
                color={darkMode ? "white" : "black"}
              />
            </div>
            <h2>
              {machine.id ? (
                <Label
                  placeholder={"Edit Machine"}
                  backgroundColor={darkMode ? "tertiary-bg" : "secondary"}
                  textColor={darkMode ? "white" : "black"}
                />
              ) : (
                <Label
                  placeholder={"Add Machine"}
                  backgroundColor={darkMode ? "tertiary-bg" : "secondary"}
                  textColor={darkMode ? "white" : "black"}
                />
              )}
            </h2>
          </div>
        </div>

        <div
          className={`flex column gap full-height machine-inputs ${
            darkMode ? "black-bg" : "white-bg"
          }`}
        >
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
              <div className="machine-upload">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
              <div className="flex space-btw center" style={{ width: "150px" }}>
                <Button
                  placeHolder="Upload Image"
                  backgroundColor={darkMode ? "black" : "white"}
                  textColor="blue"
                  className="mark-read"
                  onClick={handleUploadImage}
                />
                <Icon
                  icon={faTrashCan}
                  onClick={handleDeleteImage}
                  color={darkMode ? "white" : "black"}
                />
              </div>
            </div>
          ) : (
            <div className="flex center">
              <img src={whiteImge} className="machineImage" alt="default" />
            </div>
          )}
          <div className=" flex column gap-btn">
            <div className="flex gap full-width start">
              <div className="flex column">
                <Input
                  placeHolder={machine.name || "name"}
                  name="Name"
                  width="24vw"
                  leftIcon={faUser}
                  type="text"
                  backgroundColor="mode"
                  iconColor="mode"
                  onChange={(e) => {
                    ChangingFormData("name", e.target.value);
                  }}
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
              <div className="flex column">
                <Input
                  leftIcon={faAt}
                  placeHolder={machine.serial_number || "serial number"}
                  name="Serial Number"
                  width="24vw"
                  type="text"
                  backgroundColor="mode"
                  iconColor="mode"
                  onChange={(e) => {
                    ChangingFormData("serial_number", e.target.value);
                  }}
                />
                {errors.serial_number && (
                  <p className="error">{errors.serial_number}</p>
                )}
              </div>
            </div>
            <div className="flex gap full-width start">
              <div className="flex column">
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
                {errors.unit_per_hour && (
                  <p className="error">{errors.unit_per_hour}</p>
                )}
              </div>
              <div className=" flex column">
                <ChooseOption
                  options={statusOption}
                  onSelect={(option) => handleOptionSelect("status", option)}
                  width="24vw"
                  textColor="black"
                  required={false}
                  leftIcon={faAngleDown}
                  name="Status"
                />
                {errors.status && <p className="error">{errors.status}</p>}
              </div>
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
              <div className="flex column">
                <ReactDate
                  leftIcon={faCalendarDays}
                  name="Last Maintenance"
                  width="calc(48vw + 24px)"
                  placeHolder={machine.last_maintenance || "dd/MM/yyyy"}
                  onChange={(e) => ChangingFormData("last_maintenance", e)}
                />
                {errors.last_maintenance && (
                  <p className="error">{errors.last_maintenance}</p>
                )}
              </div>
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
