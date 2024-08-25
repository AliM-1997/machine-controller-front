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
    const { data } = await axios.request({
      url: route,
      method: requestMethod,
      data: body,
    });
  } catch (error) {}
};
