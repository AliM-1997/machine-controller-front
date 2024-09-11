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
  GetStatisticByMachineName: async (name) => {
    console.log("machine name testing", name);
    try {
      const data = await requestApi({
        route: `/machineStatistics/${name}`,
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
  CreateMachineStatisticCalculation: async (formData) => {
    console.log("formdata", formData);
    try {
      const data = await requestApi({
        route: "machineStatistics/calculations",
        requestMethod: RequestMethods.POST,
        body: formData[0],
      });
      console.log("data", data);
      return data;
    } catch (error) {
      alert("Statistic Note Created Try again");
    }
  },
};
