import React from "react";
import "./style.css";
import Label from "../../base/Label";
import Input from "../../base/Input";
import Button from "../../base/Button";
const UserProfile = () => {
  return (
    <div className="flex column userProfile-container">
      <div>
        <h2>
          <Label placeholder="User Profile" fontWeight="bold" />
        </h2>
      </div>
      <div className="flex column center secondary-bg full-width">
        <div></div>
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
      <div className="flex row center full-width gap">
        <Input width="35vw" placeHolder="name" name="Name" />
        <Input width="35vw" placeHolder="@username" name="username" />
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default UserProfile;
