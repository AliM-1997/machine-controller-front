import React, { useEffect, useState } from "react";
import "./style.css";
import Label from "../../base/Label";
import Input from "../../base/Input";
import Button from "../../base/Button";
import {
  faEnvelope,
  faKey,
  faLocation,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Users } from "../../data/remote/User";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DisplayImage from "../../base/DisplayImage";

const UserProfile = () => {
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
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/allUsers");
  };
  const handleFormData = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  console.log("from user profile", user.image_path);
  const handleSave = async () => {
    if (user.id) {
      const updatedData = await Users.UpdateUser(user.id, formData);
      if (updatedData) {
        alert("update user successfully");
      }
    } else {
      const createdData = await Users.CreateUser(formData);
      if (createdData) {
        alert("create user successfully");
      }
    }
    navigate("/allUsers");
  };

  return (
    <div className="flex column userProfile-container gap ">
      <div>
        <h2>
          <Label placeholder="User Profile" fontWeight="bold" />
        </h2>
      </div>
      <div className="flex full-width space-btw">
        <div className="flex  gap">
          <div clas>
            <DisplayImage
              width="70px"
              heigth="70px"
              url={user.image_path || "image"}
            />
            <input type="file" onChange={handleFileChange} />
          </div>
          <div className="flex column">
            <Label placeholder={user.name || "Name"} />
            <Label placeholder={user.role || "Role"} />
            <Label placeholder={user.email || "email"} />
          </div>
        </div>
        <div className="flex center gap full-width ">
          <Button
            placeHolder="Upload image"
            width="15vw"
            textColor="white"
            backgroundColor="primary"
          />
          <Button
            placeHolder="add"
            width="10vw"
            textColor="white"
            backgroundColor="primary"
          />
        </div>
      </div>
      <div className="flex row center full-width space-btw ">
        <Input
          width="37vw"
          placeHolder={user.name || "Name"}
          name="Name"
          type="text"
          leftIcon={faUser}
          onChange={(e) => handleFormData("name", e.target.value)}
        />
        <Input
          width="37vw"
          placeHolder={user.username || "@username"}
          name="username"
          type="text"
          leftIcon={faUser}
          onChange={(e) => handleFormData("username", e.target.value)}
        />
      </div>
      <div className="flex row center full-width space-btw ">
        <Input
          width="37vw"
          placeHolder={user.role || "user/admin"}
          name="Role"
          type="text"
          leftIcon={faUser}
          onChange={(e) => handleFormData("role", e.target.value)}
        />
        <Input
          width="37vw"
          placeHolder={user.phone_number || "961-00-000000"}
          name="Phone Number"
          type="text"
          leftIcon={faPhone}
          onChange={(e) => handleFormData("phone_number", e.target.value)}
        />
      </div>
      <div className="flex full-width gap column">
        <div>
          <Input
            placeHolder={user.email || "example@gamil.com"}
            name="Email"
            type="email"
            leftIcon={faEnvelope}
            onChange={(e) => handleFormData("email", e.target.value)}
          />
        </div>
        <div className="flex full-width row center space-btw ">
          <Input
            width="37vw"
            placeHolder={user.password || "password"}
            name="Password"
            type="password"
            leftIcon={faKey}
            onChange={(e) => handleFormData("password", e.target.value)}
          />
          <Input
            width="37vw"
            placeHolder={user.password || "password"}
            name="Confirmed-Password"
            type="password"
            leftIcon={faKey}
            onChange={(e) =>
              handleFormData("password_confirmation", e.target.value)
            }
          />
        </div>
      </div>
      <div className="full-width">
        <Input
          placeHolder="location"
          name="Location"
          leftIcon={faLocation}
          type="text"
          onChange={(e) => handleFormData("location", e.target.value)}
        />
      </div>
      <div className="flex end gap">
        <Button
          placeHolder="Cancel"
          backgroundColor="primary"
          width="10vw"
          textColor="white"
          onClick={handleCancel}
        />
        <Button
          placeHolder={user.name ? "save" : "create"}
          backgroundColor="primary"
          width="10vw"
          textColor="white"
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default UserProfile;
