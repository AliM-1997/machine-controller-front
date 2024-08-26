import axios from "axios";
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

    // Log request details
    console.log("Request Details:", {
      url: route,
      method: requestMethod,
      headers,
      data: body,
    });

    const { data } = await axios.request({
      url: route,
      method: requestMethod,
      data: body,
      headers: headers,
    });

    console.log("Response Data:", data);
    return data;
  } catch (error) {
    // Log error details
    console.error("Request Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    if (
      (error.response && error.response.status === 401) ||
      error.response.status === 403
    ) {
      authLocal.saveToken(null);
      if (typeof navigationFunction === "function") {
        navigationFunction();
      }
    }

    throw new Error("Failed to fetch data", {
      cause:
        error.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        error.response ||
        error,
    });
  }
};
