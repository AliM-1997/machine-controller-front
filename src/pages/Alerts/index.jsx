import React from "react";
import "./style.css";
import Header from "../../components/Header";
import { Notifications } from "../../data/remote/notification";
const Alerts = () => {
  const handleUnReadNotification = async () => {
    const response = await Notifications.UnReadNotification();
    console.log("unread notifications in alerts", response);
  };
  handleUnReadNotification();
  const handleMarkNotificationAsRead = async () => {
    const notificationId = "e3fabc38-a818-4479-a12c-8e83a9cbaea5";
    const response = await Notifications.MarkNottificationAsRead(
      notificationId
    );
    console.log("mark as read notification", response);
  };
  handleMarkNotificationAsRead();
  return (
    <div>
      <Header pageName={"Alerts"} showChooseInput={false} />
      <div className="flex column"></div>
    </div>
  );
};

export default Alerts;
