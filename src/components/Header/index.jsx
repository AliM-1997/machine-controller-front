import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../base/Input";
import {
  faSearch,
  faUser,
  faBell,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "../../base/Icon";
import DropButton from "../../base/DropButton";
import "./style.css";
import { useSelector } from "react-redux";
import { useDarkMode } from "../../data/constext/DarkModeContext";
const Header = ({
  pageName,
  showChooseInput = true,
  showIcons = true,
  options = [],
}) => {
  const state = useSelector((global) => global.data);
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
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
  return (
    <div className={`header-container ${darkMode ? "black-bg" : "white-bg"}`}>
      <div className="flex row gap">
        <h1 className={darkMode ? "white-txt" : "black-txt"}>{pageName}</h1>
      </div>
      <div className="flex header-left">
        {showChooseInput && (
          <DropButton
            options={options}
            onSelect={handleSelect}
            width="15vw"
            rightIcon={faAngleDown}
            hidden={!showChooseInput}
            backgroundColor="white"
            border={true}
          />
        )}
        {showIcons && (
          <div className="flex center h-icon">
            <Icon
              icon={faBell}
              color="primary"
              className=""
              onClick={handleNavigateAlerts}
            />
            {state.UnReadNotification > 0 && (
              <div className=" flex center notification-count">
                {state.UnReadNotification}
              </div>
            )}
            <Icon icon={faUser} color="primary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
