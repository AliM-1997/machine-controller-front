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
        <div className="profile-table">
          <div className="profile-row">
            <div className="profile-label">Name:</div>
            <div className="profile-value">{parsedProfile.name || "N/A"}</div>
          </div>
          <div className="profile-row">
            <div className="profile-label">Username:</div>
            <div className="profile-value">
              {parsedProfile.username || "N/A"}
            </div>
          </div>
          <div className="profile-row">
            <div className="profile-label">Role:</div>
            <div className="profile-value">{parsedProfile.role || "N/A"}</div>
          </div>
          <div className="profile-row">
            <div className="profile-label">Email:</div>
            <div className="profile-value">{parsedProfile.email || "N/A"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
