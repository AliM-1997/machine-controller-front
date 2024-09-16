import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import Header from "../Header";
import "./style.css";
import { Outlet } from "react-router-dom";
import { Functions } from "../../utils/reusableFunctions";
import { LoadData } from "../../data/redux/dataSlice";
import { useDispatch } from "react-redux";
import { useDarkMode } from "../../data/constext/DarkModeContext";
import echo from "../../utils/echo";
import Pusher from "pusher-js";

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
  // echo.channel("notifications").listen("NotificationCountEvent", (event) => {
  //   console.log("Unread Count:", event.unreadCount);
  //   document.getElementById("unread-count").innerText = event.unreadCount;
  // });
  // useEffect(() => {
  //   Pusher.logToConsole = true;
  //   const pusher = new Pusher("dd8ec4453a99fc7c6507", {
  //     cluster: "ap2",
  //   });

  //   const channel = pusher.subscribe("notification");
  //   channel.bind("my-event", function (data) {
  //     alert(JSON.stringify(data));
  //   });
  // }, []);
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
