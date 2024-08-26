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

const Header = ({ pageName, showChooseInput }) => {
  return (
    <div className=" header-container white-bg">
      <div className="flex row gap">
        <h1>{pageName}</h1>
        <Input
          width="15vw"
          rightIcon={faAngleDown}
          placeHolder="choose"
          hidden={!showChooseInput}
        />
      </div>
      <div className="flex header-left">
        <Input width="20vw" leftIcon={faSearch} rightIcon={faList} />
        <div className="flex center h-icon">
          <Icon icon={faBell} />
          <Icon icon={faUser} />
        </div>
      </div>
    </div>
  );
};

export default Header;
