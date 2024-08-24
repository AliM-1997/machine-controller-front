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
  faRightFromBracket,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
const NavBar = () => {
  return (
    <div className="flex column nav-container white-bg full-width full-height ">
      <div className="top-nav">
        <div className="flex center logo">
          <img src={logo} alt="Logo" className="logo" />
          <h1>
            <span className="highlight">D</span>ustry
          </h1>
        </div>

        <div className="flex column center gap">
          <Button
            placeHolder="DashBoard"
            width="250px"
            leftIcon={faTh}
            iconColor="#00b7eb"
          />
          <Button
            placeHolder="Machines"
            width="250px"
            leftIcon={faGear}
            iconColor="#00b7eb"
          />
          <Button
            placeHolder="Tasks"
            width="250px"
            leftIcon={faClipboard}
            iconColor="#00b7eb"
          />
          <Button
            placeHolder="Predictions"
            width="250px"
            leftIcon={faChartLine}
            iconColor="#00b7eb"
          />
          <Button
            placeHolder="Alerts"
            width="250px"
            leftIcon={faBell}
            iconColor="#00b7eb"
          />
          <Button
            placeHolder="User Management"
            width="250px"
            leftIcon={faUsers}
            iconColor="#00b7eb"
          />
        </div>
      </div>
      <div className="flex column center gap">
        <Button
          placeHolder="Dark Mood"
          width="250px"
          leftIcon={faMoon}
          iconColor="#00b7eb"
        />
        <Button
          placeHolder="Logout"
          width="250px"
          leftIcon={faRightFromBracket}
          iconColor="#00b7eb"
        />
      </div>
    </div>
  );
};

export default NavBar;
