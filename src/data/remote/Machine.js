import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";

export const Machines = {
  CreateMachine: async (formData) => {
    try {
      const data = await requestApi({
        route: "/machine",
        requestMethod: RequestMethods.POST,
        body: formData,
      });
      console.log("create from remote", data);
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  },
  //   UpadateMachine,
  DeleteMachine: async (id) => {
    try {
      const data = await requestApi({
        route: `/machine/${id}`,
        requestMethod: RequestMethods.DeleteMachine,
      });
      console.log("data when delete from remote", data);
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  },
  GetMachineById: async (id) => {
    try {
      const data = await requestApi({ route: `machine/${id}` });
      console.log("get all machine by id from  remote", data);
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  },
  GetAllMachines: async () => {
    try {
      const data = await requestApi({ route: "/machine" });
      console.log("get all machine from  remote", data);
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  },
};
