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
      <div className="flex column notification-outer">
        <div className=" flex title-notification">
          <h3>Notifications</h3>
        </div>
        <div className="flex column center gap padding-30px full-width">
          <div className=" flex full-width Lprimary-bg padding-30px space-btw">
            <div>
              <p>notification</p>
            </div>
            <div>
              <p className="blue-txt mark-read">mark as read</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
