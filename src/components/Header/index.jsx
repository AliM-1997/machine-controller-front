import React from "react";
import "./style.css";
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

const Header = ({ pageName, showChooseInput, options }) => {
  return (
    <div className=" header-container white-bg">
      <div className="flex row gap">
        <h1>{pageName}</h1>
        <DropButton
          options={options}
          width="15vw"
          rightIcon={faAngleDown}
          placeHolder="choose"
          hidden={!showChooseInput}
          required={false}
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
