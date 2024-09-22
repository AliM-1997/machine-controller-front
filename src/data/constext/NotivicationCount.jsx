import React, { createContext, useContext, useState, useEffect } from "react";
import echo from "../../utils/echo";
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const channel = echo.channel("notifications");

    const handleNotificationCountEvent = (event) => {
      if (event && event.unreadCount !== undefined) {
        setNotificationCount(event.unreadCount);
      }
    };

    const handleTaskAssignedEvent = (event) => {
      if (event && event.updatedUnreadCount !== undefined) {
        setNotificationCount(event.updatedUnreadCount);
      }
    };

    channel.listen("NotificationCountEvent", handleNotificationCountEvent);
    channel.listen("TaskAssignedEvent", handleTaskAssignedEvent);

    return () => {
      channel.stopListening(
        "NotificationCountEvent",
        handleNotificationCountEvent
      );
      channel.stopListening("TaskAssignedEvent", handleTaskAssignedEvent);
      echo.leaveChannel("notifications");
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notificationCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
