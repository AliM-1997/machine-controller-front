import React, { useState } from "react";
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
const UserProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    role: "",
    phone_number: "",
    email: "",
    password: "",
    confirmed_password: "",
    location: "",
  });
  console.log(formData);

  return (
    <div className="flex column userProfile-container gap ">
      <div>
        <h2>
          <Label placeholder="User Profile" fontWeight="bold" />
        </h2>
      </div>
      <div className="flex full-width space-btw">
        <div className="flex center gap">
          <div>image</div>
          <div className="flex column ">
            <Label placeholder="name" />
            <Label placeholder="role" />
            <Label placeholder="gmail" />
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
            placeHolder="Delete"
            width="10vw"
            textColor="white"
            backgroundColor="primary"
          />
        </div>
      </div>
      <div className="flex row center full-width space-btw ">
        <Input
          width="37vw"
          placeHolder="name"
          name="Name"
          type="text"
          leftIcon={faUser}
          onChange={(e) => {
            setFormData(e.target.value);
          }}
        />
        <Input
          width="37vw"
          placeHolder="@username"
          name="username"
          type="text"
          leftIcon={faUser}
        />
      </div>
      <div className="flex row center full-width space-btw ">
        <Input
          width="37vw"
          placeHolder="user/admin"
          name="Role"
          type="text"
          leftIcon={faUser}
        />
        <Input
          width="37vw"
          placeHolder="961-00-000000"
          name="Phone Number"
          type="text"
          leftIcon={faPhone}
        />
      </div>
      <div className="flex full-width gap column">
        <div>
          <Input
            placeHolder="email@gamil.com"
            name="Email"
            type="email"
            leftIcon={faEnvelope}
          />
        </div>
        <div className="flex full-width row center space-btw ">
          <Input
            width="37vw"
            placeHolder="password"
            name="Password"
            type="password"
            leftIcon={faKey}
          />
          <Input
            width="37vw"
            placeHolder="password"
            name="Confirmed-Password"
            type="password"
            leftIcon={faKey}
          />
        </div>
      </div>
      <div className="full-width">
        <Input
          placeHolder="location"
          name="Location"
          leftIcon={faLocation}
          type="text"
        />
      </div>
      <div className="flex end gap">
        <Button
          placeHolder="Cancel"
          backgroundColor="primary"
          width="10vw"
          textColor="white"
        />
        <Button
          placeHolder="Save"
          backgroundColor="primary"
          width="10vw"
          textColor="white"
        />
      </div>
    </div>
  );
};

export default UserProfile;
