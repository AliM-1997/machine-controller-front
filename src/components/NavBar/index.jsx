import React from "react";
import logo from "../../assets/images/logo.png";
import "./style.css";
import Button from "../../base/Button";
import {
  faGear,
  faBell,
  faTh,
  faUsers,
  faClipboard,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
const NavBar = () => {
  return (
    <div className="flex column nav-container white-bg full-width full-height">
      <div className="top-nav">
        <div className="flex center logo">
          <img src={logo} alt="Logo" className="logo" />
          <h1>
            <span className="highlight">D</span>ustry
          </h1>
        </div>

        <div className="flex column center gap">
          <Button placeHolder="DashBoard" width="250px" leftIcon={faTh} />
          <Button placeHolder="Machines" width="250px" leftIcon={faGear} />
          <Button placeHolder="Tasks" width="250px" leftIcon={faClipboard} />
          <Button
            placeHolder="Predictions"
            width="250px"
            leftIcon={faChartLine}
          />
          <Button placeHolder="Alerts" width="250px" leftIcon={faBell} />
          <Button
            placeHolder="User Management"
            width="250px"
            leftIcon={faUsers}
          />
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default NavBar;
