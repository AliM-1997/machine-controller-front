import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";

export const Tasks = {
  GetAllTasks: async () => {
    try {
      const data = await requestApi({ route: "/task" });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  },
  CreateTask: async (formData) => {
    try {
      const data = await requestApi({
        route: "/task",
        requestMethod: RequestMethods.POST,
        body: formData,
      });
      console.log("data from task remote", data);
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  },
  UpdateTask: async (id, formData) => {
    try {
      const data = await requestApi({
        route: `/task/${id}`,
        requestMethod: RequestMethods.PUT,
        body: formData,
      });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  },
  DeleteTask: async (id) => {
    try {
      const data = await requestApi({
        route: `/task/${id}`,
        requestMethod: RequestMethods.DELETE,
      });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  },
  GetTaskByID: async (id) => {
    try {
      const data = await requestApi({
        route: `/task/${id}`,
        requestMethod: RequestMethods.GET,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  },
  GetByMachineName: async (name) => {
    try {
      const data = await requestApi({ route: `/task/machinename/${name}` });
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      alert("No task found for the given machine");
    }
  },
  GetTaskByStatus: async (status) => {
    try {
      const data = await requestApi({ route: `/task/status/${status}` });
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      alert("No task found for the given machine");
    }
  },
};
