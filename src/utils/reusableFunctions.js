import { Machines } from "../data/remote/Machine";
import { Notifications } from "../data/remote/notification";
import SpareParts from "../data/remote/spareParts";
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

      const SparePartSerialNumber = await SpareParts.GetAllSerialNumbers();
      data.SparePartSerialNumber = SparePartSerialNumber;

      const UnReadNotification = await Notifications.UnReadNotification();
      data.UnReadNotification = UnReadNotification.notifications?.length || 0;

      const Taskstatus = [
        { label: "Completed" },
        { label: "Risked" },
        { label: "Delayed" },
        { label: "In Progress" },
        { label: "Pending" },
      ];
      data.Taskstatus = Taskstatus;
      const MachineStatus = [
        { label: "active" },
        { label: "Under Maintenance" },
        { label: "attention" },
      ];
      data.MachineStatus = MachineStatus;
    } catch (error) {
      console.error("Error fetching machine data:", error);
    }
    return data;
  },
};
