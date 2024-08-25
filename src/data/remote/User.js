import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";

export const Users = {
  GetAllUsers: async () => {
    try {
      const data = await requestApi({
        route: "/user",
        requestMethod: RequestMethods.GET,
      });
      return data;
    } catch (error) {
      console.error("Failed to get all users:", error);
      throw error;
    }
  },
  DeleteUser: async (user) => {
    try {
      const data = await requestApi({
        route: `/user/${user}`,
        requestMethod: RequestMethods.DELETE,
      });
      console.log(data);
    } catch (error) {
      throw error;
    }
  },
  //   EditeUser,
  //   CreateUser,
};
