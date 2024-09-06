import React from "react";
import logoLight from "../../assets/images/logoLight.png";
import logoDark from "../../assets/images/LogoDark.png";
import "./style.css";
import Button from "../../base/Button";
import {
  faGear,
  faTh,
  faUsers,
  faClipboard,
  faChartLine,
  faRightFromBracket,
  faMoon,
  faChevronRight,
  faCalendarTimes,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { authRemote } from "../../data/remote/Auth_user";
import { authLocal } from "../../data/local/Auth_local";
import { useDarkMode } from "../../data/constext/DarkModeContext";

const NavBar = ({ onNavigate, isClick }) => {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authRemote.Logout();
    authLocal.clearToken();
    navigate("/login");
  };

  const handleClickedButton = (buttonName, path) => {
    onNavigate(buttonName);
    navigate(path);
  };

  const navButton = (name, icon, path) => ({
    placeHolder: name,
    width: "12vw",
    leftIcon: icon,
    backgroundColor: !darkMode
      ? isClick === name
        ? "primary"
        : "secondary"
      : isClick === name
      ? "tertiary"
      : "white",
    iconColor: !darkMode
      ? isClick === name
        ? "white"
        : "black"
      : isClick === name
      ? "black"
      : "primary",
    rightIcon: isClick === name ? faChevronRight : null,
    textColor: isClick === name ? "white" : "black",
    onClick: () => {
      handleClickedButton(name, path);
    },
  });

  return (
    <div
      className={`flex column nav-container ${
        darkMode ? "black-bg" : "white-bg"
      } full-width full-height space-btw`}
    >
      <div className="top-nav">
        <div className="flex center logo-container">
          <img src={darkMode ? logoDark : logoLight} alt="Logo" />
          <h1>
            <span className="highlight">D</span>
            <span className={darkMode ? "white-txt" : "black-txt"}>ustry</span>
          </h1>
        </div>

        <div className="flex column center gap">
          <Button {...navButton("Dashboard", faTh, "/dashboard")} />
          <Button {...navButton("Machines", faGear, "/allmachines")} />
          <Button {...navButton("Tasks", faClipboard, "/tasks")} />
          <Button {...navButton("Predictions", faChartLine, "/predictions")} />
          <Button {...navButton("User Management", faUsers, "/allusers")} />
          <Button {...navButton("Alerts", faCalendarTimes, "/alerts")} />
          <Button {...navButton("Spare Parts", faToolbox, "/allsparepart")} />
        </div>
      </div>
      <div className="flex column center gap">
        <Button
          placeHolder="Dark Mode"
          backgroundColor={!darkMode ? "secondary" : "white"}
          width="12vw"
          leftIcon={faMoon}
          iconColor={!darkMode ? "black" : "white"}
          mode
        />
        <Button
          placeHolder="Logout"
          width="12vw"
          leftIcon={faRightFromBracket}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default NavBar;
