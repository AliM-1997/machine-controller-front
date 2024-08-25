import { RequestMethods } from "./request_methods";
export const requestApi = ({
  includeToken = true,
  route,
  requestMethod = RequestMethods.GET,
  body = null,
  navigationFunction = () => {},
}) => {};
