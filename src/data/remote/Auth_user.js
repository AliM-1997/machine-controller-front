import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { authLocal } from "../local/Auth_local";
export const authRemote = {
  Login: async (email, password) => {
    const data = await requestApi({
      route: "/login",
      requestMethod: RequestMethods.POST,
      body: {
        email,
        password,
      },
    });
    return data;
  },
  Signup: async (email, password, name) => {
    const data = await requestApi({
      route: "/register",
      requestMethod: RequestMethods.POST,
      body: {
        name,
        email,
        password,
      },
    });
    return data;
  },
  Logout: async () => {
    try {
      const data = await requestApi({
        route: "/logout",
        requestMethod: RequestMethods.POST,
      });
      authLocal.saveToken(null);
      console.log("Logout successful:", data);
    } catch (error) {
      throw error;
    }
  },
};
