import React from "react";
import NavBar from "../NavBar";
import Header from "../Header";
import "./style.css";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="flex row page">
      <div className="container-1">
        <NavBar />
      </div>
      <div className="flex column container-2">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
