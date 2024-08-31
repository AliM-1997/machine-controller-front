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

const Header = ({ pageName, showChooseInput, showIcons, options = [] }) => {
  const navigate = useNavigate();

  const handleSelect = (option) => {
    if (option.url) {
      navigate(`/${option.url}`);
    } else {
      console.log("Invalid option selected");
    }
  };

  return (
    <div className="header-container white-bg">
      <div className="flex row gap">
        <h1>{pageName}</h1>
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
            <Icon icon={faBell} color="primary" />
            <Icon icon={faUser} color="primary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
