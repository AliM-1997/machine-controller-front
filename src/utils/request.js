import axios from "axios";
import { toast } from "react-toastify";
import { RequestMethods } from "./request_methods";
import { authLocal } from "../data/local/Auth_local";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

let hasShownSessionExpired = false;

export const requestApi = async ({
  includeToken = true,
  route,
  requestMethod = RequestMethods.GET,
  body = null,
  navigationFunction = () => {},
}) => {
  try {
    const token = authLocal.getToken();
    const headers =
      includeToken && token ? { Authorization: `Bearer ${token}` } : {};

    const { data } = await axios.request({
      url: route,
      method: requestMethod,
      data: body,
      headers: headers,
    });

    hasShownSessionExpired = false;
    return data;
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      authLocal.saveToken(null);
      if (!hasShownSessionExpired) {
        toast.error("Session expired. Please log in again.");
        hasShownSessionExpired = true;
      }

      if (typeof navigationFunction === "function") {
        navigationFunction();
      }
    } else {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    }
  }
};
