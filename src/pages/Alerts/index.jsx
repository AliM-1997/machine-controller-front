import React from "react";
import "./style.css";
import Header from "../../components/Header";
import { Notifications } from "../../data/remote/notification";
const Alerts = () => {
  const handleUnReadNotification = async () => {
    const response = await Notifications.unread();
    console.log("unread notifications in alerts", response);
  };
  handleUnReadNotification();

  return (
    <div>
      <Header pageName={"Alerts"} showChooseInput={false} />
      <div className="flex column"></div>
    </div>
  );
};

export default Alerts;
