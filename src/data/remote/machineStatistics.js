import axios from "axios";
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
    const data = formData[0];

    try {
      const response = await requestApi({
        route: "machineStatistics/calculations",
        requestMethod: RequestMethods.POST,
        body: data,
      });
      // console.log("data asdasdasdasdasd", data);
      return response;
    } catch (error) {
      alert("Statistic Note Created Try again");
    }
  },
  GetMachinePrediction: async (formData) => {
    const data = formData[0];
    const URL_BASE = process.env.REACT_APP_BASE_URL_PREDICTIONS;
    console.log(URL_BASE);

    if (!URL_BASE) {
      console.error(
        "Base URL is not defined. Make sure .env is configured correctly."
      );
      return;
    }

    try {
      const response = await axios.post(`${URL_BASE}api/v1/predict`, data);
      console.log("Prediction Data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching prediction:", error);
      alert("No Prediction Found");
    }
  },
};
