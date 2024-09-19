import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { toast } from "react-toastify";

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
      toast.error(`Error creating machine: ${error.message}`);
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
      toast.error(`Error updating machine: ${error.message}`);
    }
  },
  DeleteMachine: async (id) => {
    try {
      const data = await requestApi({
        route: `/machine/${id}`,
        requestMethod: RequestMethods.DELETE,
      });
      return data;
    } catch (error) {
      toast.error(`Error deleting machine: ${error.message}`);
    }
  },
  GetMachineById: async (id) => {
    try {
      const data = await requestApi({ route: `machine/${id}` });
      return data;
    } catch (error) {
      toast.error(`Error fetching machine by ID: ${error.message}`);
    }
  },
  GetAllMachines: async () => {
    try {
      const data = await requestApi({ route: "/machine" });
      return data;
    } catch (error) {
      toast.error(`Error fetching machines: ${error.message}`);
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
      toast.error(`Error deleting image: ${error.message}`);
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
      toast.error(`Error uploading image: ${error.message}`);
    }
  },
  GetMachineByName: async (name) => {
    try {
      const data = await requestApi({ route: `machine/name/${name}` });
      return data;
    } catch (error) {
      toast.error(`Error fetching machine by name: ${error.message}`);
    }
  },
  GetAllMachineSerialNumber: async () => {
    try {
      const data = await requestApi({ route: "/machine/serial/number" });
      return data;
    } catch (error) {
      toast.error(`Error fetching machine serial numbers: ${error.message}`);
    }
  },
  GetAllMachineAllNames: async () => {
    try {
      const data = await requestApi({ route: "/machine/all/name" });
      return data;
    } catch (error) {
      toast.error(`Error fetching machine names: ${error.message}`);
    }
  },
  AddSparePartToMachine: async (machineSerialNumber, sparePartSerialNumber) => {
    try {
      const data = await requestApi({
        route: "machines/spareparts/create",
        requestMethod: RequestMethods.POST,
        body: {
          machine_serial_number: machineSerialNumber,
          spare_part_serial_number: sparePartSerialNumber,
        },
      });
      return data;
    } catch (error) {
      toast.error(`Error adding spare part to machine: ${error.message}`);
    }
  },
  getsparePartforMachine: async (
    machineSerialNumber,
    sparePartSerialNumber
  ) => {
    try {
      const data = await requestApi({
        route: "machine-spare-part/relationship",
        requestMethod: RequestMethods.POST,
        body: {
          machine_serial_number: machineSerialNumber,
          spare_part_serial_number: sparePartSerialNumber,
        },
      });
      return data;
    } catch (error) {
      toast.error(`Error fetching spare part for machine: ${error.message}`);
    }
  },
  GetallSparepartForMachine: async (machine_serial_number) => {
    try {
      const data = await requestApi({
        route: "machine/spareparts/get",
        requestMethod: RequestMethods.POST,
        body: { machine_serial_number: machine_serial_number },
      });
      return data;
    } catch (error) {
      toast.error(`Error fetching spare parts for machine: ${error.message}`);
    }
  },
};
