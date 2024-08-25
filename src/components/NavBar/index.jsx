import React, { useState } from "react";
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
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
const NavBar = () => {
  const [isClick, setIsClicked] = useState(null);
  const navigate = useNavigate();

  const handleClickedButton = (buttonName, path) => {
    setIsClicked(buttonName);
    navigate(path);
  };
  const navButton = (name, icon, path) => ({
    placeHolder: name,
    width: "250px",
    leftIcon: icon,
    backgroundColor: isClick === name ? "primary" : "secondary",
    iconColor: isClick === name ? "white" : "#00b7eb",
    rightIcon: isClick === name ? faChevronRight : null,
    textColor: isClick === name ? "white" : "black",
    onClick: () => {
      handleClickedButton(name, path);
    },
  });

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
          <Button {...navButton("Dashboard", faTh, "/dashboard")} />

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
