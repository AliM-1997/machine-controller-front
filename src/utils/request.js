import axios from "axios";
import { RequestMethods } from "./request_methods";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const requestApi = ({
  includeToken = true,
  route,
  requestMethod = RequestMethods.GET,
  body = null,
  navigationFunction = () => {},
}) => {};
