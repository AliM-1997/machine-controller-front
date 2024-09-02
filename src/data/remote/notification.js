import { requestApi } from "../../utils/request";

export const Notifications = {
  UnReadNotification: async () => {
    try {
      const data = await requestApi({ route: "/notifications/unread" });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  MarkNottificationAsRead: async (notificationId) => {
    try {
      const data = await requestApi({
        route: `/notifications/${notificationId}/read`,
      });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
