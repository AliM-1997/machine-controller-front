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
import { authRemote } from "../../data/remote/Auth_user";
import { authLocal } from "../../data/local/Auth_local";
const NavBar = ({ onNavigate, isClick }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/login");
    const data = await authRemote.Logout();
    authLocal.clearToken();
  };

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
    <div className="flex column nav-container white-bg full-width full-height space-btw">
      <div className="top-nav">
        <div className="flex center logo-container">
          <img src={logo} alt="Logo" />
          <h1>
            <span className="highlight">D</span>ustry
          </h1>
        </div>

        <div className="flex column center gap">
          <Button {...navButton("Dashboard", faTh, "/dashboard")} />
          <Button {...navButton("Machines", faGear, "/allmachines")} />
          <Button {...navButton("Tasks", faClipboard, "/tasks")} />
          <Button {...navButton("Predictions", faChartLine, "/predictions")} />
          <Button {...navButton("User Management", faUsers, "/allusers")} />
          <Button {...navButton("Alerts", faUsers, "/alerts")} />
        </div>
      </div>
      <div className="flex column center gap">
        <Button
          placeHolder="Dark Mode"
          width="12vw"
          leftIcon={faMoon}
          iconColor="#00b7eb"
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
