import React, { useEffect, useState } from "react";
import "./style.css";
import Label from "../../base/Label";
import Input from "../../base/Input";
import Button from "../../base/Button";
import {
  faAngleRight,
  faEnvelope,
  faKey,
  faLocation,
  faPhone,
  faTrashCan,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Users } from "../../data/remote/User";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DisplayImage from "../../base/DisplayImage";
import Header from "../../components/Header";
import whiteImage from "../../assets/images/white-bg.png";
import whiteImge from "../../assets/images/white-bg.png";
import Icon from "../../base/Icon";
import { useDarkMode } from "../../data/constext/DarkModeContext";
import { clearUser } from "../../data/redux/userSlice";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { darkMode } = useDarkMode();
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const user = useSelector((global) => global.user);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    role: "user",
    phone_number: "",
    email: "",
    password: "",
    password_confirmation: "",
    location: "",
    image_path: "",
  });
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        role: user.role || "user",
        phone_number: user.phone_number || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
        location: user.location || "",
        image_path: user.image_path || "",
      });
    }
  }, [user]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (formData.password && formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    if (formData.password !== formData.password_confirmation)
      newErrors.password_confirmation = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleCancel = () => {
    navigate("/allUsers");
  };
  const handleFormData = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  const handleSave = async () => {
    if (user.id) {
      const updatedData = await Users.UpdateUser(user.id, formData);
      if (updatedData) {
        dispatch(clearUser());
        toast.success("User updated successfully");
      }
    } else {
      if (validateForm()) {
        try {
          const createdData = await Users.CreateUser(formData);
          if (createdData) {
            toast.success("User created successfully");
            navigate("/allusers");
          }
        } catch (error) {
          console.error("Error creating user:", error);
          toast.error("Failed to create user");
        }
      }
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
    if (selectedImage) {
      try {
        await Users.UploadImage(selectedImage, user.id);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error.message);
        toast.error("Failed to upload image.");
      }
    }
  };
  const handleDeleteImage = async () => {
    try {
      await Users.DeleteImage(user.id);
      setFormData({ ...formData, image_path: "" });
      setImagePreview(null);

      toast.success("Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image:", error.message);
      toast.error("Failed to delete image.");
    }
  };
  const options = [
    { label: "User Profile", url: "allusers/userProfile" },
    { label: "All Users", url: "allusers" },
  ];
  return (
    <div>
      <Header pageName={"User Management"} options={options} />
      <div className="flex column full-width  center ">
        <div className="flex column gap title userProfile-container">
          <div className="flex   full-width gap ">
            <Icon
              icon={faAngleRight}
              onClick={handleCancel}
              color={darkMode ? "white" : "black"}
            />
            <h2>
              <Label
                placeholder={user.id ? "Edit User" : "Add User"}
                fontWeight="bold"
                backgroundColor={darkMode ? "tertiary-bg" : "secondary"}
                textColor={darkMode ? "white" : "black"}
              />
            </h2>
          </div>
        </div>
        <div
          className={`flex column gap-btn  addtask-inputs ${
            darkMode ? "black-bg" : "white-bg"
          } center`}
        >
          {user.id ? (
            <div className="flex gap ">
              <div className="flex space-btw over">
                {imagePreview ? (
                  <img src={imagePreview} className="userImage" alt="user" />
                ) : user.image_path ? (
                  <DisplayImage
                    url={user.image_path}
                    width="150px"
                    heigth="150px"
                  />
                ) : (
                  <img src={whiteImage} className="userImage" alt="default" />
                )}
                <input
                  className="choose-file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "" }}
                />
              </div>
              <div className="flex column center">
                <div className="flex column ">
                  <Label
                    placeholder={user.name || "Name"}
                    backgroundColor={darkMode ? "black-bg" : "white-bg"}
                    textColor={darkMode ? "white" : "black"}
                  />
                  <Label
                    placeholder={user.role || "Role"}
                    backgroundColor={darkMode ? "black-bg" : "white-bg"}
                    textColor={darkMode ? "white" : "black"}
                  />
                  <Label
                    placeholder={user.email || "email"}
                    backgroundColor={darkMode ? "black-bg" : "white-bg"}
                    textColor={darkMode ? "white" : "black"}
                  />
                </div>
                <div className="flex gap  image-actions">
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
            </div>
          ) : (
            <div className="flex center">
              <img src={whiteImge} className="userImage" alt="default" />
            </div>
          )}
          <div className="flex row center gap full-width">
            <div className="flex column">
              <Input
                width="24vw"
                placeHolder={formData.name || "Name"}
                name="Name"
                type="text"
                leftIcon={faUser}
                onChange={(e) => handleFormData("name", e.target.value)}
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>

            <div className="flex column">
              <Input
                width="24vw"
                placeHolder={user.username || "@username"}
                name="Username"
                type="text"
                leftIcon={faUser}
                required={false}
                onChange={(e) => handleFormData("username", e.target.value)}
              />
              {errors.username && (
                <div className="error">{errors.username}</div>
              )}
            </div>
          </div>
          <div className="flex row center gap full-width">
            <Input
              width="24vw"
              placeHolder={user.role || "user/admin"}
              name="Role"
              type="text"
              leftIcon={faUser}
              required={false}
              onChange={(e) => handleFormData("role", e.target.value)}
            />
            <Input
              width="24vw"
              placeHolder={user.phone_number || "961-00-000000"}
              name="Phone Number"
              type="text"
              leftIcon={faPhone}
              required={false}
              onChange={(e) => handleFormData("phone_number", e.target.value)}
            />
          </div>
          <div className="flex full-width gap column center">
            <div>
              <div className="flex column">
                <Input
                  placeHolder={formData.email || "example@gamil.com"}
                  name="Email"
                  type="email"
                  leftIcon={faEnvelope}
                  width="calc(48vw + 24px)"
                  onChange={(e) => handleFormData("email", e.target.value)}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
            </div>
            <div className="flex row center gap full-width">
              <div className="flex column">
                <Input
                  width="24vw"
                  placeHolder="Password"
                  name="Password"
                  type="password"
                  leftIcon={faKey}
                  onChange={(e) => handleFormData("password", e.target.value)}
                />
                {errors.password && (
                  <div className="error">{errors.password}</div>
                )}
              </div>

              <div className="flex column">
                <Input
                  width="24vw"
                  placeHolder="Confirm Password"
                  name="Confirmed-Password"
                  type="password"
                  leftIcon={faKey}
                  onChange={(e) =>
                    handleFormData("password_confirmation", e.target.value)
                  }
                />
                {errors.password_confirmation && (
                  <div className="error">{errors.password_confirmation}</div>
                )}
              </div>
            </div>
          </div>
          <div className="flex center">
            <Input
              placeHolder="location"
              name="Location"
              leftIcon={faLocation}
              type="text"
              required={false}
              width="calc(48vw + 24px)"
              onChange={(e) => handleFormData("location", e.target.value)}
            />
          </div>

          <div
            className="flex end gap-btn "
            style={{ width: `calc(48vw + 24px)` }}
          >
            {user.id && (
              <Button
                placeHolder="Cancel"
                backgroundColor="primary"
                width="7vw"
                textColor="white"
                onClick={handleCancel}
              />
            )}

            <Button
              placeHolder={user.name ? "Save" : "Create"}
              backgroundColor="primary"
              width="7vw"
              textColor="white"
              onClick={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
