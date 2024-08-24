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

const Header = ({ pagename }) => {
  return (
    <div className="flex center header white-bg">
      <div>
        <Input width="300px" leftIcon={faSearch} rightIcon={faList} />
      </div>

      <div className="flex center h-icon">
        <Icon icon={faBell} />
        <Icon icon={faUser} />
      </div>
    </div>
  );
};

export default Header;
