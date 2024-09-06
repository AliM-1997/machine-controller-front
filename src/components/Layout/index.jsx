import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import Header from "../Header";
import "./style.css";
import { Outlet } from "react-router-dom";
import { Functions } from "../../utils/reusableFunctions";
import { LoadData } from "../../data/redux/dataSlice";
import { useDispatch } from "react-redux";
import { useDarkMode } from "../../data/constext/DarkModeContext";

const Layout = () => {
  const [clickedPage, setClickedPage] = useState(null);
  const { darkMode } = useDarkMode();
  const dispatch = useDispatch();
  useEffect(() => {
    const handledata = async () => {
      const response = await Functions.HandlingAppRenderFuntions();
      dispatch(LoadData(response));
    };
    handledata();
  }, []);
  const handlePageChange = (newPageName) => {
    setClickedPage(newPageName);
  };

  return (
    <div className={`flex row  ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="container-1">
        <NavBar onNavigate={handlePageChange} isClick={clickedPage} />
      </div>
      <div className="flex column container-2">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
