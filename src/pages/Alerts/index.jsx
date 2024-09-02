import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import { Notifications } from "../../data/remote/notification";
import Button from "../../base/Button";
const Alerts = () => {
  const [nonRead, setNoneRead] = useState([]);
  const handleUnReadNotification = async () => {
    const response = await Notifications.UnReadNotification();
    console.log("unread notifications in alerts", response);
    setNoneRead(response.notifications || []);
  };

  const handleMarkNotificationAsRead = async (notificationId) => {
    const response = await Notifications.MarkNottificationAsRead(
      notificationId
    );
    setNoneRead(
      nonRead.filter((notification) => notification.id !== notificationId)
    );
  };

  useEffect(() => {
    handleUnReadNotification();
  }, []);

  return (
    <div>
      <Header pageName={"Alerts"} showChooseInput={false} />
      <div className="flex column notification-outer">
        <div className="flex title-notification">
          <h3>Notifications</h3>
        </div>
        <div className="flex column center gap padding-30px full-width white-bg"></div>
      </div>
    </div>
  );
};

export default Alerts;
