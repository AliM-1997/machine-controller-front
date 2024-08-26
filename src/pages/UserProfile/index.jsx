import React from "react";
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
      <div className="flex gap column">
        <div>
          <Input
            placeHolder="email@gamil.com"
            name="Email"
            width="full-width"
            type="email"
            leftIcon={faEnvelope}
          />
        </div>
        <div className="flex row center full-width space-btw ">
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
      <div>
        <Input
          placeHolder="location"
          name="Location"
          width="full-width"
          leftIcon={faLocation}
          type="text"
        />
      </div>
    </div>
  );
};

export default UserProfile;
