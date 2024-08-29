import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";

export const MachineStatistics = {
  GetALLStatistics: async () => {
    try {
      const data = await requestApi({ route: "/machineStatistic" });
      console.log("all statistics form remote", data);
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  },
  GetStatisticByMachineName: async (machineName) => {
    try {
      const data = await requestApi({
        route: `/machineStatistics/${machineName}`,
      });
      console.log("all statistics form remote", data);
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  },
};
