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
    console.log("machine name testing", machineName);
    try {
      const data = await requestApi({
        route: `/machineStatistics/${machineName}`,
      });
      console.log("all statistics form remote", data);
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      alert("No statistics found for this machine.");
    }
  },
  GetStatisticByNameAndDate: async (name, date) => {
    console.log(date);
    try {
      const data = await requestApi({
        route: `/machineStatistics/byName/byDate/?machine_name=${name}&date=${date}`,
      });
      console.log("all statistics form remote", data);
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      alert("No statistics found at this date.");
    }
  },
  GetStatisticBetweenDate: async (name, startDate, endDate) => {
    try {
      const data = await requestApi({
        route: `/machineStatistics/byName/betweenDate/?machine_name=${name}&startDate=${startDate}&endDate=${endDate}`,
      });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      alert("No statistics found between given dates.");
    }
  },
};
