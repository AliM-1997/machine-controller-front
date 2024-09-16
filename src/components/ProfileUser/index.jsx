import React from "react";
import "./style.css";
import { useDarkMode } from "../../data/constext/DarkModeContext";
import Icon from "../../base/Icon";
import { faX } from "@fortawesome/free-solid-svg-icons";
const ProfileUser = ({ onclick }) => {
  const { darkMode } = useDarkMode();
  const profile = localStorage.getItem("user");

  let parsedProfile = {};
  if (profile) {
    parsedProfile = JSON.parse(profile);
  }
  return (
    <div
      className={`flex column padding-30px profile-user gap-btn ${
        darkMode ? "tertiary-bg white-txt" : "secondary-bg"
      }`}
    >
      <div className="flex end">
        <Icon
          icon={faX}
          color={darkMode ? "white" : "black"}
          onClick={onclick}
        />
      </div>
      <div>
        <div className="flex align-start gap">
          <h4>Name:</h4>
          <p className="right-side">{parsedProfile.name || "N/A"}</p>
        </div>
        <div className="flex align-start gap">
          <h4>Username:</h4>
          <p className="right-side">{parsedProfile.username || "N/A"}</p>
        </div>
        <div className="flex space-btw align-start">
          <h4>Email:</h4>
          <p className="right-side">{parsedProfile.email || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
