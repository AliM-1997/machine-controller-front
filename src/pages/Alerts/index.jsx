import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import { Notifications } from "../../data/remote/notification";
import Button from "../../base/Button";
import { useDarkMode } from "../../data/constext/DarkModeContext";
const Alerts = () => {
  const { darkMode } = useDarkMode();
  console.log("asdasdasdasd", darkMode);
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
      <Header
        pageName={"Alerts"}
        showChooseInput
        backgroundColor_btn={darkMode ? "black" : "white"}
        border={false}
        textColor_btn={darkMode ? "black" : "white"}
      />
      <div
        className={`flex column notification-outer ${
          darkMode ? "terchuery-bg" : "secondary-bg"
        }`}
      >
        <div
          className={`flex title-notification ${
            darkMode ? "white-txt" : "black-txt"
          }`}
        >
          <h3>Notifications</h3>
        </div>
        <div className="flex column center gap padding-30px full-width white-bg notification-box">
          <div className="flex column  gap full-width notification-info">
            {nonRead.length > 0 ? (
              nonRead.map((alert) => (
                <div
                  key={alert.id}
                  className="flex full-width Lprimary-bg padding-30px space-btw center"
                >
                  <p>{alert.data.user_id}</p>
                  <p>{alert.data.machine_name}</p>
                  <p>{alert.data.status}</p>

                  <div>
                    <Button
                      placeHolder="mark as read"
                      backgroundColor="Lprimary"
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
