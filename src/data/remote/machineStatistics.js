import axios from "axios";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { toast } from "react-toastify";

export const MachineStatistics = {
  GetALLStatistics: async () => {
    try {
      const data = await requestApi({ route: "/machineStatistic" });
      return data;
    } catch (error) {
      toast.error("Error creating user:", error.message);
    }
  },
  GetStatisticByMachineName: async (name) => {
    try {
      const data = await requestApi({
        route: `/machineStatistics/${name}`,
      });
      return data;
    } catch (error) {
      toast.error("Error creating user:", error.message);
      toast.error("No statistics found for this machine.");
    }
  },
  GetStatisticByNameAndDate: async (name, date) => {
    try {
      const data = await requestApi({
        route: `/machineStatistics/byName/byDate/?machine_name=${name}&date=${date}`,
      });
      return data;
    } catch (error) {
      toast.error("Error creating user:", error.message);
      toast.error("No statistics found at this date.");
    }
  },
  GetStatisticBetweenDate: async (name, startDate, endDate) => {
    try {
      const data = await requestApi({
        route: `/machineStatistics/byName/betweenDate/?machine_name=${name}&startDate=${startDate}&endDate=${endDate}`,
      });
      return data;
    } catch (error) {
      toast.error("Error creating user:", error.message);
      toast.error("No statistics found between given dates.");
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
      return response;
    } catch (error) {
      toast.error("Statistic Note Created Try again");
    }
  },
  GetMachinePrediction: async (formData) => {
    const data = formData[0];
    const URL_BASE = process.env.REACT_APP_BASE_URL_PREDICTIONS;

    if (!URL_BASE) {
      console.error(
        "Base URL is not defined. Make sure .env is configured correctly."
      );
      return;
    }

    try {
      const response = await axios.post(`${URL_BASE}api/v1/predict`, data);
      return response.data;
    } catch (error) {
      toast.error("Error fetching prediction:", error);
      toast.error("No Prediction Found");
    }
  },
  GetSensorData: async () => {
    try {
      const data = await requestApi({ route: "sensordata/last" });
      return data;
    } catch (error) {
      toast.error(error);
    }
  },
};
