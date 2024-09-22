import axios from "axios";
import { toast } from "react-toastify";
import { RequestMethods } from "./request_methods";
import { authLocal } from "../data/local/Auth_local";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const requestApi = async ({
  includeToken = true,
  route,
  requestMethod = RequestMethods.GET,
  body = null,
  navigationFunction = () => {},
}) => {
  try {
    const token = authLocal.getToken();
    const headers = includeToken ? { Authorization: `Bearer ${token}` } : {};

    // Make the API request
    const { data } = await axios.request({
      url: route,
      method: requestMethod,
      data: body,
      headers: headers,
    });

    return data;
  } catch (error) {
    console.error("Request Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    if (error.response?.status === 401 || error.response?.status === 403) {
      authLocal.saveToken(null);
      toast.error("Session expired. Please log in again.");

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
