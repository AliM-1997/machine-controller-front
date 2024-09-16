import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import { Notifications } from "../../data/remote/notification";
import Button from "../../base/Button";
import { useDarkMode } from "../../data/constext/DarkModeContext";
import echo from "../../utils/echo";

const Alerts = () => {
  const { darkMode } = useDarkMode();
  const [nonRead, setNoneRead] = useState([]);

  const handleUnReadNotification = async () => {
    try {
      const response = await Notifications.UnReadNotification();
      console.log("unread notifications in alerts", response);
      setNoneRead(response.notifications || []);
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
    }
  };

  const handleMarkNotificationAsRead = async (notificationId) => {
    try {
      await Notifications.MarkNottificationAsRead(notificationId);
      setNoneRead(
        nonRead.filter((notification) => notification.id !== notificationId)
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  useEffect(() => {
    handleUnReadNotification();

    const channel = echo.channel("notifications");
    channel.listen(".NotificationCountEvent", (event) => {
      console.log("New Notification:", event.notification);
      setNoneRead((prevNotifications) => [
        event.notification,
        ...prevNotifications,
      ]);
    });

    return () => {
      channel.stopListening(".NotificationCountEvent");
    };
  }, []);

  return (
    <div>
      <Header
        pageName={"Alerts"}
        showChooseInput={false}
        backgroundColor_btn={darkMode ? "black" : "white"}
        border={false}
        textColor_btn={darkMode ? "black" : "white"}
      />
      <div
        className={`flex column notification-outer ${
          darkMode ? "tertiary-bg" : "secondary-bg"
        }`}
      >
        <div
          className={`flex title-notification ${
            darkMode ? "white-txt" : "black-txt"
          }`}
        >
          <h3>Notifications</h3>
        </div>
        <div
          className={`flex column center gap padding-30px full-width ${
            darkMode ? "black-bg" : "white-bg"
          } notification-box`}
        >
          <div className="flex column gap full-width notification-info">
            {nonRead.length > 0 ? (
              nonRead.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex full-width ${
                    !darkMode ? "Lprimary-bg" : "tertiary-bg"
                  } padding-30px space-btw center info-notification`}
                >
                  <p className={darkMode ? "white-txt" : "black-txt"}>
                    {alert.data.user_id}
                  </p>
                  <p className={darkMode ? "white-txt" : "black-txt"}>
                    {alert.data.machine_name}
                  </p>
                  <p className={darkMode ? "white-txt" : "black-txt"}>
                    {alert.data.status}
                  </p>
                  <div>
                    <Button
                      placeHolder="mark as read"
                      backgroundColor={darkMode ? "tertiary" : "Lprimary"}
                      textColor="blue"
                      onClick={() => handleMarkNotificationAsRead(alert.id)}
                      className="mark-read"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No unread notifications</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
