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
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  },
  UpadateMachine: async (machine, formData) => {
    try {
      const data = await requestApi({
        route: `/machine/${machine}`,
        requestMethod: RequestMethods.PUT,
        body: formData,
      });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  },
  DeleteMachine: async (id) => {
    try {
      const data = await requestApi({
        route: `/machine/${id}`,
        requestMethod: RequestMethods.DELETE,
      });
      console.log("asdsadasdD", data);
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  },
  GetMachineById: async (id) => {
    try {
      const data = await requestApi({ route: `machine/${id}` });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  },
  GetAllMachines: async () => {
    try {
      const data = await requestApi({ route: "/machine" });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  },
  DeleteImage: async (id) => {
    try {
      const data = await requestApi({
        route: `/machine/deleteImage/${id}`,
        requestMethod: RequestMethods.DELETE,
      });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  },
  UploadImage: async (file, id) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const data = await requestApi({
        route: `/machine/uploadImage/${id}`,
        requestMethod: RequestMethods.POST,
        body: formData,
      });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  },
  GetMachineByName: async (name) => {
    try {
      const data = await requestApi({ route: `machine/name/${name}` });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  },
  GetAllMachineSerialNumber: async () => {
    try {
      const data = await requestApi({ route: "/machine/serial/number" });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  },
  GetAllMachineAllNames: async () => {
    try {
      const data = await requestApi({ route: "/machine/all/name" });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  },
};
