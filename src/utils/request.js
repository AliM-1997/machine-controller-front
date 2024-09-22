import axios from "axios";
import { toast } from "react-toastify"; // Import toast
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
    // Log error details for debugging purposes
    console.error("Request Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    // Handle token-related errors (401 and 403) and force navigation if needed
    if (error.response?.status === 401 || error.response?.status === 403) {
      authLocal.saveToken(null); // Clear token
      toast.error("Session expired. Please log in again."); // Display error message

      if (typeof navigationFunction === "function") {
        navigationFunction(); // Redirect the user (e.g., to the login page)
      }
    } else {
      // Handle other types of errors and display appropriate toast notifications
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`); // Show error message as toast
    }
  }
};
