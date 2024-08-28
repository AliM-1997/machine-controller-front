import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../base/Input";
import {
  faSearch,
  faList,
  faUser,
  faBell,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "../../base/Icon";
import DropButton from "../../base/DropButton";
import "./style.css";

const Header = ({ pageName, showChooseInput, options = [] }) => {
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
        <DropButton
          options={options}
          onSelect={handleSelect}
          width="15vw"
          rightIcon={faAngleDown}
          placeHolder="Choose"
          hidden={!showChooseInput}
          backgroundColor="primary"
          textColor="white"
        />
      </div>
      <div className="flex header-left">
        <Input
          width="20vw"
          leftIcon={faSearch}
          rightIcon={faList}
          required={false}
        />
        <div className="flex center h-icon">
          <Icon icon={faBell} color="primary" />
          <Icon icon={faUser} color="primary" />
        </div>
      </div>
    </div>
  );
};

export default Header;
