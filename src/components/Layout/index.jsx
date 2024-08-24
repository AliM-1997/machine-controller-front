import React from "react";
import NavBar from "../NavBar";
import Header from "../Header";
import "./style.css";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div>
      <div className="flex row page ">
        <NavBar />
        <div className="flex column">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
