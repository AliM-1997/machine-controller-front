import React, { useState } from "react";
import NavBar from "../NavBar";
import Header from "../Header";
import "./style.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [clickedPage, setClickedPage] = useState(null);
  const [showChooseInput, setShowChooseInput] = useState(true);

  const handlePageChange = (newPageName) => {
    setClickedPage(newPageName);

    switch (newPageName) {
      case "Dashboard":
        setShowChooseInput(false);
        break;
      case "Machines":
        setShowChooseInput(true);
        break;
      case "Tasks":
        setShowChooseInput(true);
        break;
      case "Predictions":
        setShowChooseInput(true);
        break;
      case "Alerts":
        setShowChooseInput(false);
        break;
      default:
        setShowChooseInput(true);
    }
  };

  return (
    <div className="flex row page">
      <div className="container-1">
        <NavBar onNavigate={handlePageChange} isClick={clickedPage} />
      </div>
      <div className="flex column container-2">
        <Header pageName={clickedPage} showChooseInput={showChooseInput} />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
