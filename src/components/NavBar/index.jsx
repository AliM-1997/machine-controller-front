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
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const NavBar = ({ onNavigate, isClick }) => {
  const navigate = useNavigate();

  const handleClickedButton = (buttonName, path) => {
    onNavigate(buttonName);
    navigate(path);
  };
  const navButton = (name, icon, path) => ({
    placeHolder: name,
    width: "12vw",
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
        <div className="flex center logo-container">
          <img src={logo} alt="Logo" />
          <h1>
            <span className="highlight">D</span>ustry
          </h1>
        </div>

        <div className="flex column center gap">
          <Button {...navButton("Dashboard", faTh, "/dashboard")} />
          <Button {...navButton("Machines", faGear, "/addmachine")} />
          <Button {...navButton("Tasks", faClipboard, "/tasks")} />
          <Button {...navButton("Predictions", faChartLine, "/predictions")} />
          <Button {...navButton("Alerts", faBell, "/alerts")} />
          <Button {...navButton("User Management", faUsers, "/allusers")} />
        </div>
      </div>
      <div className="flex column center gap">
        <Button
          placeHolder="Dark Mood"
          width="12vw"
          leftIcon={faMoon}
          iconColor="#00b7eb"
        />
        <Button {...navButton("Logout", faRightFromBracket, "/login")} />
      </div>
    </div>
  );
};

export default NavBar;
