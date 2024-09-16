import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../base/Input";
import {
  faSearch,
  faUser,
  faBell,
  faAngleDown,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "../../base/Icon";
import DropButton from "../../base/DropButton";
import "./style.css";
import { useDarkMode } from "../../data/constext/DarkModeContext";
import ProfileUser from "../ProfileUser";

const Header = ({
  pageName,
  showChooseInput = true,
  showIcons = true,
  options = [],
  backgroundColor_btn = "white",
  border = true,
  textColor_btn,
}) => {
  const [profileIcon, setprofileIcon] = useState(false);
  const state = useSelector((state) => state.data);
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    setNotificationCount(state.UnReadNotification);
  }, [state.UnReadNotification]);

  const handleSelect = (option) => {
    if (option.url) {
      navigate(`/${option.url}`);
    } else {
      console.log("Invalid option selected");
    }
  };

  const handleNavigateAlerts = () => {
    navigate("/alerts");
  };

  const handleExitProfile = () => {
    setprofileIcon(false);
  };
  const handleOpenProfile = () => {
    setprofileIcon(true);
  };
  return (
    <div className={`header-container ${darkMode ? "black-bg" : "white-bg"}`}>
      <div className="flex row gap">
        <h1 className={darkMode ? "white-txt" : "black-txt"}>{pageName}</h1>
      </div>
      <div className="flex header-left">
        <div className="flex ">
          {showChooseInput && (
            <DropButton
              options={options}
              onSelect={handleSelect}
              width="15vw"
              rightIcon={faAngleDown}
              hidden={!showChooseInput}
              backgroundColor={backgroundColor_btn}
              border={border}
              textColor={
                textColor_btn ? textColor_btn : darkMode ? "white" : "black"
              }
            />
          )}
        </div>
        {showIcons && (
          <div className="header-container flex gpa">
            <div className="h-icon flex gap">
              <Icon
                icon={faBell}
                color="primary"
                onClick={handleNavigateAlerts}
              />
              {/* notificationCount > 0 && ( */}
              <div className="notification-count flex center">
                {notificationCount}
              </div>

              <Icon
                icon={faUser}
                color="primary"
                className="profile-icon"
                onClick={handleOpenProfile}
              />
              <div className="profile-box">
                {profileIcon && <ProfileUser onclick={handleExitProfile} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
