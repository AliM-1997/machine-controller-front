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
};
export default SpareParts;
