import { requestApi } from "../../utils/request";

export const Notifications = {
  unread: async () => {
    try {
      data = await requestApi({});
    } catch (error) {
      console.error(message.error);
      throw error;
    }
  },
};
