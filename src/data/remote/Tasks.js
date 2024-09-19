import { toast } from "react-toastify";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";

export const Tasks = {
  GetAllTasks: async () => {
    try {
      const data = await requestApi({ route: "/task" });
      return data;
    } catch (error) {
      toast.error("Error creating user:", error.message);
    }
  },
  CreateTask: async (formData) => {
    try {
      const data = await requestApi({
        route: "/task",
        requestMethod: RequestMethods.POST,
        body: formData,
      });
      return data;
    } catch (error) {
      toast.error("Error creating user:", error.message);
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
      toast.error("Error creating user:", error.message);
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
      toast.error("Error creating user:", error.message);
    }
  },
  GetTaskByID: async (id) => {
    try {
      const data = await requestApi({
        route: `/task/${id}`,
        requestMethod: RequestMethods.GET,
      });
      return data;
    } catch (error) {
      toast.error("Error creating user:", error.message);
    }
  },
  GetByMachineName: async (name) => {
    try {
      const data = await requestApi({ route: `/task/machinename/${name}` });
      console.log(data);
      return data;
    } catch (error) {
      toast.error(error);
      toast.error("No task found for the given machine");
    }
  },
  GetByMachineSerialNumber: async (serial_number) => {
    try {
      const data = await requestApi({
        route: `/task/machineserialnumber/${serial_number}`,
      });
      console.log(data);
      return data;
    } catch (error) {
      toast.error(error);
      toast.error("No task found for the given machine");
    }
  },
  GetTaskByStatus: async (status) => {
    try {
      const data = await requestApi({ route: `/task/status/${status}` });
      return data;
    } catch (error) {
      toast.error(error);
      toast.error("No task found for the given status");
    }
  },
  GetTaskByDate: async (date) => {
    try {
      const data = await requestApi({ route: `/task/date/${date}` });
      return data;
    } catch (error) {
      toast.error(error);
      toast.error("No task found for the given date");
    }
  },
  CreateTaskByUsername: async (formData) => {
    try {
      const data = await requestApi({
        route: `/task/username`,
        requestMethod: RequestMethods.POST,
        body: formData,
      });
      return data;
    } catch (error) {
      toast.error(error);
    }
  },
  GetTaskByUsername: async (username) => {
    try {
      const data = await requestApi({
        route: `/task/username/${username}`,
      });
      return data;
    } catch (error) {
      toast.error(error);
      toast.error("No task found for the given user");
    }
  },

  GetAllTaskDetailsById: async (id) => {
    try {
      const data = await requestApi({ route: `task/all/details/${id}` });
      return data;
    } catch (error) {
      toast.error(error);
      toast("No task found for the given id");
    }
  },
  GetAllTaskDetails: async () => {
    try {
      const data = await requestApi({ route: `task/all/details/` });
      return data;
    } catch (error) {
      toast.error(error);
      toast.error("No task found for the given id");
    }
  },
  AddUserReport: async (taskId, userReport) => {
    try {
      const data = await requestApi({
        route: `task/user/report/${taskId}`,
        body: { user_report: userReport },
        requestMethod: RequestMethods.POST,
      });
      return data;
    } catch (error) {
      toast.error("Error adding task report:", error);
    }
  },
};
