import React from "react";
import "./style.css";
import Input from "../../base/Input";
import {
  faSearch,
  faList,
  faUser,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "../../base/Icon";

const Header = ({ pageName }) => {
  return (
    <div className=" header-container white-bg">
      <div>
        <h1>{pageName}</h1>
      </div>
      <div className="flex header-left">
        <Input width="300px" leftIcon={faSearch} rightIcon={faList} />
        <div className="flex center h-icon">
          <Icon icon={faBell} />
          <Icon icon={faUser} />
        </div>
      </div>
    </div>
  );
};

export default Header;
