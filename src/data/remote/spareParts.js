import { toast } from "react-toastify";
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
      toast.error("No SparePart Found");
    }
  },
  GetSparePartByID: async (id) => {
    try {
      const data = await requestApi({ route: `/sparePart/${id}` });
      return data;
    } catch (error) {
      toast.error("Error creating user:", error.message);
    }
  },
  GetByType: async (type) => {
    try {
      const data = await requestApi({ route: `/sparePart/type/${type}` });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      toast.error("No SparePart Found for the given type");
    }
  },
  GetAllSerialNumbers: async () => {
    try {
      const data = await requestApi({ route: "/sparePart/serial/numbers" });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      toast.error("No SparePart Found ");
    }
  },
  DeleteSparePartImage: async (id) => {
    try {
      const data = await requestApi({
        route: `/sparePart/deleteImage/${id}`,
        requestMethod: RequestMethods.DELETE,
      });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      toast.error("Cannot Delete Image");
    }
  },

  UploadImage: async (file, id) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const data = await requestApi({
        route: `/sparePart/uploadImage/${id}`,
        requestMethod: RequestMethods.POST,
        body: formData,
      });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  },
  DeleteSparePart: async (id) => {
    try {
      const data = await requestApi({
        route: `/sparePart/${id}`,
        requestMethod: RequestMethods.DELETE,
      });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      toast.error("SparePart not Found ");
    }
  },
  CreateSparePart: async (form) => {
    try {
      const data = await requestApi({
        route: `/sparePart`,
        requestMethod: RequestMethods.POST,
        body: form,
      });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      toast.error("Spare Part Not Created ");
    }
  },
  UpdateSparePart: async (id, form) => {
    try {
      const data = await requestApi({
        route: `/sparePart/${id}`,
        requestMethod: RequestMethods.PATCH,
        body: form,
      });
      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      toast.error("Cannot Update Try again later");
    }
  },
};
export default SpareParts;
