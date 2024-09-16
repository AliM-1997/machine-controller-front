import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import Label from "../../base/Label";
import Input from "../../base/Input";
import whiteImge from "../../assets/images/white-bg.png";
import "./style.css";
import {
  faAngleRight,
  faAt,
  faClipboard,
  faGear,
  faSearch,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useDarkMode } from "../../data/constext/DarkModeContext";
import Icon from "../../base/Icon";
import Button from "../../base/Button";
import SpareParts from "../../data/remote/spareParts";
import { useDispatch, useSelector } from "react-redux";
import DisplayImage from "../../base/DisplayImage";
import { ClearSparePart, LoadSparePart } from "../../data/redux/sparePartSlice";
import ChooseOption from "../../base/ChooseOption";

const AddSparePart = () => {
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const sparepart = useSelector((global) => global.sparepart || {});
  const dispatch = useDispatch();
  console.log(selectedImage);
  const [formData, setFormData] = useState({
    name: "",
    serial_number: "",
    life_cylce: "",
    standard_temperature: "",
    image_path: "",
    description: "",
    type: "",
  });

  const handleSparePartByID = async () => {
    if (id) {
      const response = await SpareParts.GetSparePartByID(id);
      setFormData({ ...response.spare_part });
      console.log(response);
    }
  };
  useEffect(() => {
    handleSparePartByID();
  }, [id]);
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleNavigateAllSparePart = () => {
    navigate("/allsparepart");
  };

  const ChangingFormData = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleOptionSelect = (name, option) => {
    ChangingFormData(name, option.label);
  };

  const handleCreateSparePart = async () => {
    if (id) {
      const updateDate = await SpareParts.UpdateSparePart(id, formData);
      if (updateDate) {
        dispatch(LoadSparePart(updateDate));
        alert("Spare Part Updated Successfully");
      }
    } else {
      const createData = await SpareParts.CreateSparePart(formData);
      if (createData) {
        alert("Spare Part Created Successfullty");
        handleNavigateAllSparePart();
      }
    }
  };

  const handleDeleteSparePart = async () => {
    if (id) {
      const deleteData = await SpareParts.DeleteSparePart(id);
      if (deleteData) {
        alert("Spare Part Deleted Successfully");
        dispatch(ClearSparePart());
        navigate("/allsparepart");
      } else {
        alert("Failed to delete spare part. Please try again.");
      }
    } else {
      alert("Spare Part Not Found!");
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

  const handleDeleteImage = async () => {
    if (sparepart.image_path !== null) {
      try {
        await SpareParts.DeleteSparePartImage(id);
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

  const handleUploadImage = async () => {
    if (selectedImage && sparepart.id !== null) {
      try {
        const image = await SpareParts.UploadImage(selectedImage, id);
        dispatch(LoadSparePart({ ...sparepart, image_path: image }));
        alert("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error.message);
        alert("Failed to upload image.");
      }
    } else {
      alert("No Selected Image/ not created machine ");
    }
  };
  const sparepartOptions = [
    { label: "Mechanical" },
    { label: "Electrical" },
    { label: "OIL" },
  ];

  const options = [
    { label: "Add SparePart", url: "addsparepart" },
    { label: "All SparePrts", url: "allsparepart" },
  ];
  return (
    <div>
      <Header options={options} pageName="Machines" className="container" />
      <div className="flex column full-width addMachine-container gap center">
        <div className="flex column gap ">
          <div className="flex gap title ">
            <Icon
              icon={faAngleRight}
              onClick={handleNavigateAllSparePart}
              color={darkMode ? "white" : "black"}
            />
            <h2>
              {id ? (
                <Label
                  placeholder={"Edit SparePart"}
                  backgroundColor={darkMode ? "tertiary-bg" : "secondary"}
                  textColor={darkMode ? "white" : "black"}
                />
              ) : (
                <Label
                  placeholder={"Add SparePart"}
                  backgroundColor={darkMode ? "tertiary-bg" : "secondary"}
                  textColor={darkMode ? "white" : "black"}
                />
              )}
            </h2>
            <div className="flex center"></div>
          </div>
        </div>

        <div
          className={`flex column gap full-height machine-inputs ${
            darkMode ? "black-bg" : "white-bg"
          }`}
        >
          {id ? (
            <div className="flex column center">
              <div className="sparePart-image flex center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    className="sparepartImage"
                    alt="machine"
                  />
                ) : formData.image_path ? (
                  <DisplayImage
                    width="150px"
                    height="150px"
                    url={formData.image_path}
                  />
                ) : (
                  <img
                    src={whiteImge}
                    className="sparepartImage"
                    alt="default"
                  />
                )}

                <input
                  type="file"
                  onChange={handleFileChange}
                  className="sparePart-upload"
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
                  placeHolder={id ? formData.name : "name"}
                  name="Name"
                  width="24vw"
                  leftIcon={faGear}
                  type="text"
                  onChange={(e) => {
                    ChangingFormData("name", e.target.value);
                  }}
                />
              </div>
              <div className="flex column">
                <Input
                  leftIcon={faAt}
                  placeHolder={id ? formData.serial_number : "serial number"}
                  name="Serial Number"
                  width="24vw"
                  type="text"
                  onChange={(e) => {
                    ChangingFormData("serial_number", e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex gap full-width start">
              <Input
                placeHolder={id ? formData.standard_temperature : "description"}
                name="Standard Temperature"
                leftIcon={faClipboard}
                width="24vw"
                type="text"
                onChange={(e) => {
                  ChangingFormData("standard_temperature", e.target.value);
                }}
              />
              <Input
                placeHolder={id ? formData.life_cylce : "life cycle "}
                name="Life Cylce"
                leftIcon={faClipboard}
                width="24vw"
                type="text"
                onChange={(e) => {
                  ChangingFormData("life_cycle", e.target.value);
                }}
              />
            </div>

            <div className="flex center "></div>
            <div className="flex center ">
              <Input
                placeHolder={id ? formData.description : "description"}
                name="Spare Part Description"
                leftIcon={faClipboard}
                width="calc(48vw + 24px)"
                type="text"
                required={false}
                onChange={(e) => {
                  ChangingFormData("description", e.target.value);
                }}
              />
            </div>
            <div className="flex center ">
              <ChooseOption
                options={sparepartOptions}
                placeholder={id ? formData.type : "type"}
                onSelect={(option) => handleOptionSelect("type", option)}
                name="Type"
                leftIcon={faSearch}
                width="calc(48vw + 24px)"
                required={true}
                onChange={(e) => {
                  ChangingFormData("description", e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex end gap btn-con">
            {id && (
              <Button
                placeHolder="Delete"
                width="7vw"
                backgroundColor="primary"
                textColor="white"
                onClick={handleDeleteSparePart}
              />
            )}
            <Button
              placeHolder={id ? "Save" : "Create"}
              backgroundColor="primary"
              width="7vw"
              textColor="white"
              onClick={handleCreateSparePart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSparePart;
