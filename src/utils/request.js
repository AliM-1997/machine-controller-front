import axios from "axios";
import { RequestMethods } from "./request_methods";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const requestApi = async ({
  includeToken = true,
  route,
  requestMethod = RequestMethods.GET,
  body = null,
  navigationFunction = () => {},
}) => {
  try {
    const token = localStorage.getItem("token");
    const headers = includeToken ? { Authorization: `Bearer ${token}` } : {};
    const { data } = await axios.request({
      url: route,
      method: requestMethod,
      data: body,
      headers: headers,
    });
    console.log(data);
  } catch (error) {}
};
