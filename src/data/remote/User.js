import { toast } from "react-toastify";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";

export const Users = {
  GetAllUsers: async () => {
    try {
      const data = await requestApi({
        route: "/user",
        requestMethod: RequestMethods.GET,
      });
      return data;
    } catch (error) {
      toast.error(error);
    }
  },
  DeleteUser: async (user) => {
    try {
      const data = await requestApi({
        route: `/user/${user}`,
        requestMethod: RequestMethods.DELETE,
      });
      return data;
    } catch (error) {
      toast.error(error);
    }
  },
  SearchId: async (id) => {
    try {
      const data = await requestApi({
        route: `/user/${id}`,
        requestMethod: RequestMethods.GET,
      });
      return data;
    } catch (error) {
      toast.error(error);
    }
  },
  CreateUser: async (formData) => {
    try {
      const data = await requestApi({
        route: "/user",
        requestMethod: RequestMethods.POST,
        body: formData,
      });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      toast.error(error);
    }
  },

  UpdateUser: async (id, formData) => {
    try {
      const data = await requestApi({
        route: `/user/${id}`,
        requestMethod: RequestMethods.PUT,
        body: formData,
      });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      toast.error(error);
    }
  },
  UploadImage: async (file, id) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const data = await requestApi({
        route: `/user/updateImage/${id}`,
        requestMethod: RequestMethods.POST,
        body: formData,
      });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      toast.error(error);
    }
  },
  DeleteImage: async (id) => {
    try {
      const data = await requestApi({
        route: `/user/deleteImage/${id}`,
        requestMethod: RequestMethods.DELETE,
      });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      toast.error(error);
    }
  },
  GetAllUserName: async () => {
    try {
      const data = await requestApi({
        route: `/user/all/username`,
      });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      toast.error(error);
    }
  },
};
