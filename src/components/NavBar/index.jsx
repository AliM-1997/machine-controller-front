import React from "react";
import logo from "../../assets/images/logo.png";
import "./style.css";
const NavBar = () => {
  return (
    <div className="flex nav-container">
      <div className="flex center logo">
        <img src={logo} alt="Logo" className="logo" />
        <h1>
          <span className="highlight">D</span>ustry
        </h1>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default NavBar;
