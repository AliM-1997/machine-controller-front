import { Machines } from "../data/remote/Machine";
import { Users } from "../data/remote/User";

export const Functions = {
  ToDateformat: (date) => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toISOString().slice(0, 19).replace("T", " ");
    } else {
      console.error("Invalid date:", date);
      return "";
    }
  },
  HandlingAppRenderFuntions: async () => {
    const data = {};
    try {
      const MachineSerialNumber = await Machines.GetAllMachineSerialNumber();
      data.MachineSerialNumber = MachineSerialNumber;

      const MachineNames = await Machines.GetAllMachineAllNames();
      data.MachineNames = MachineNames;
      const UserNames = await Users.GetAllUserName();
      data.UserNames = UserNames;
    } catch (error) {
      console.error("Error fetching machine data:", error);
    }
    return data;
  },
};
