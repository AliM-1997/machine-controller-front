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
      throw error;
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
      throw error;
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
      throw error;
    }
  },
  CreateUser: async (formData) => {
    try {
      const data = await requestApi({
        route: "/user",
        requestMethod: RequestMethods.POST,
        body: formData,
      });
      console.log("User created:", data);
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  },

  UpdateUser: async (id, formData) => {
    try {
      const data = await requestApi({
        route: `/user/${id}`,
        requestMethod: RequestMethods.PUT,
        body: formData,
      });
      console.log("formuser apis", data);
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
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
      throw error;
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
      throw error;
    }
  },
  GetAllUserName: async () => {
    try {
      const data = await requestApi({
        route: `/user/all/username`,
      });
      console.log("username", data);
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  },
};
