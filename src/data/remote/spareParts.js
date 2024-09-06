import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
const SpareParts = {
  GetAllSpareParts: async () => {
    try {
      const data = await requestApi({ route: "/sparePart" });
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      alert("No SparePart Found");
    }
  },
  GetByType: async (type) => {
    try {
      const data = await requestApi({ route: `/sparePart/type/${type}` });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      alert("No SparePart Found for the given type");
    }
  },
  GetAllSerialNumbers: async () => {
    try {
      const data = await requestApi({ route: "/sparePart/serial/numbers" });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      alert("No SparePart Found ");
    }
  },
};
export default SpareParts;
