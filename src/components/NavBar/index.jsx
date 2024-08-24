import React from "react";
import logo from "../../assets/images/logo.png";
import "./style.css";
import Button from "../../base/Button";
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
          <Button placeHolder="DashBoard" width="250px" />
          <Button placeHolder="Machines" width="250px" />
          <Button placeHolder="Tasks" width="250px" />
          <Button placeHolder="Predictions" width="250px" />
          <Button placeHolder="Alerts" width="250px" />
          <Button placeHolder="User Management" width="250px" />
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default NavBar;
