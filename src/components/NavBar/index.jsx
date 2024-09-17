import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { authRemote } from "../../data/remote/Auth_user";
import { authLocal } from "../../data/local/Auth_local";
import { useDarkMode } from "../../data/constext/DarkModeContext";

const NavBar = ({ onNavigate }) => {
  const [userInfo, setUserInfo] = useState({});
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUserInfo(parsedUserData);
    }
  }, []);
  console.log(userInfo.role);
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
      ? currentPath === path
        ? "primary"
        : "secondary"
      : currentPath === path
      ? "primary"
      : "tertiary",
    iconColor: !darkMode
      ? currentPath === path
        ? "white"
        : "black"
      : currentPath === path
      ? "white"
      : "white",
    rightIcon: currentPath === path ? faChevronRight : null,
    textColor: !darkMode
      ? currentPath === path
        ? "white"
        : "black"
      : currentPath === path
      ? "white"
      : "white",
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
          {userInfo.role === "admin" && (
            <>
              <Button
                {...navButton("Dashboard", faTh, "/dashboard")}
                className={`button ${
                  currentPath === "/dashboard" ? "active" : ""
                }`}
              />
              <Button
                {...navButton("Machines", faGear, "/allmachines")}
                className={`button ${
                  currentPath === "/allmachines" ? "active" : ""
                }`}
              />
              <Button
                {...navButton("Tasks", faClipboard, "/tasks")}
                className={`button ${currentPath === "/tasks" ? "active" : ""}`}
              />
              <Button
                {...navButton("Predictions", faChartLine, "/predictions")}
                className={`button ${
                  currentPath === "/predictions" ? "active" : ""
                }`}
              />
              <Button
                {...navButton("Spare Parts", faToolbox, "/allsparepart")}
                className={`button ${
                  currentPath === "/allsparepart" ? "active" : ""
                }`}
              />
            </>
          )}
          <Button
            {...navButton("Tasks", faClipboard, "/tasks")}
            className={`button ${currentPath === "/tasks" ? "active" : ""}`}
          />
          <Button
            {...navButton("User Management", faUsers, "/allusers")}
            className={`button ${currentPath === "/allusers" ? "active" : ""}`}
          />
          {userInfo.role === "user" && (
            <>
              <Button
                {...navButton("Alerts", faCalendarTimes, "/alerts")}
                className={`button ${
                  currentPath === "/alerts" ? "active" : ""
                }`}
              />
              <Button
                {...navButton("Task Preview", faToolbox, "/taskpreview")}
                className={`button ${
                  currentPath === "/taskpreview" ? "active" : ""
                }`}
              />
            </>
          )}
        </div>
      </div>
      <div className="flex column center gap">
        <Button
          placeHolder="Dark Mode"
          backgroundColor={!darkMode ? "secondary" : "tertiary"}
          width="12vw"
          leftIcon={faMoon}
          iconColor={!darkMode ? "black" : "white"}
          mode
          textColor={!darkMode ? "black" : "white"}
        />
        <Button
          placeHolder="Logout"
          backgroundColor={!darkMode ? "secondary" : "tertiary"}
          width="12vw"
          leftIcon={faRightFromBracket}
          iconColor={!darkMode ? "black" : "white"}
          onClick={handleLogout}
          textColor={!darkMode ? "black" : "white"}
        />
      </div>
    </div>
  );
};

export default NavBar;
