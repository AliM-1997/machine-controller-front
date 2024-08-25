import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import Signup from "../../pages/Signup";
export const authRemote = {
  login: async (email, password) => {
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
};
