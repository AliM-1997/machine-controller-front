import { toast } from "react-toastify";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { authLocal } from "../local/Auth_local";
export const authRemote = {
  Login: async (email, password) => {
    try {
      const data = await requestApi({
        route: "/login",
        requestMethod: RequestMethods.POST,
        body: {
          email,
          password,
        },
      });
      return data;
    } catch (error) {
      toast.error("Error logging in: " + error.message);
    }
  },

  Signup: async (email, password, name) => {
    try {
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
    } catch (error) {
      toast.error("Error during Sign Up: " + error.message);
    }
  },

  Logout: async () => {
    try {
      const data = await requestApi({
        route: "/logout",
        requestMethod: RequestMethods.POST,
      });
      authLocal.saveToken(null); // Remove token on logout
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out: " + error.message);
    }
  },
};
