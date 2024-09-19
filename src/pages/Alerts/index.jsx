import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import { Notifications } from "../../data/remote/notification";
import Button from "../../base/Button";
import { useDarkMode } from "../../data/constext/DarkModeContext";
import { useNavigate } from "react-router-dom";

const Alerts = () => {
  const { darkMode } = useDarkMode();
  const [nonRead, setNoneRead] = useState([]);
  const navigate = useNavigate();
  const [count, setCount] = useState("");

  const handleUnReadNotification = async () => {
    try {
      const response = await Notifications.UnReadNotification();
      console.log("unread notifications in alerts", response);
      setNoneRead(response.notifications || []);
      setCount(response.count);
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
    }
  };

  const handleMarkNotificationAsRead = async (notificationId, id) => {
    try {
      await Notifications.MarkNottificationAsRead(notificationId);
      setNoneRead(
        nonRead.filter((notification) => notification.id !== notificationId)
      );

      navigate(`/taskpreview/${id}`);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  useEffect(() => {
    handleUnReadNotification();
  }, [count]);

  return (
    <div>
      <Header
        pageName={"Alerts"}
        showChooseInput={false}
        backgroundColor_btn={darkMode ? "black" : "white"}
        border={false}
        textColor_btn={darkMode ? "black" : "white"}
        count={count}
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
                    {alert.data.jobDescription}
                  </p>
                  <p className={darkMode ? "white-txt" : "black-txt"}>
                    {alert.data.status}
                  </p>
                  <div>
                    <Button
                      placeHolder="mark as read"
                      backgroundColor={darkMode ? "tertiary" : "Lprimary"}
                      textColor="blue"
                      onClick={() =>
                        handleMarkNotificationAsRead(
                          alert.id,
                          alert.data.task_id
                        )
                      }
                      className="mark-read"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className=" padding-30px error-message">No notifications</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
