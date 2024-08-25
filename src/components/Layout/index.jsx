import React, { useState } from "react";
import NavBar from "../NavBar";
import Header from "../Header";
import "./style.css";
import { Outlet } from "react-router-dom";
const Layout = () => {
  const [clickedPage, setClickedPage] = useState(null); // Lifted state

  const handlePageChange = (newPageName) => {
    setClickedPage(newPageName);
  };
  return (
    <div className="flex row page">
      <div className="container-1">
        <NavBar onNavigate={handlePageChange} isClick={clickedPage} />
      </div>
      <div className="flex column container-2">
        <Header pageName={clickedPage} />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
