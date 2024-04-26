import { custumAxios } from "../configs/axios.config";

export const RestourantUtils = {
  getRestourant: async () => {
    const { data } = await custumAxios.get("restourant/find/all", {
      headers: {
        "accept-language": localStorage.getItem("language") || "uz",
      },
    });
    return data;
  },
  addRestourant: async ({ name, description, location }) => {
    const { data } = await custumAxios.post("restourant/add", {
      name,
      location,
      description,
    });
    return data;
  },
  editRestourant: async ({ name, description, location, id }) => {
    const { data } = await custumAxios.patch(`restourant/edit/${id}`, {
      name,
      location,
      description,
    });
    return data;
  },
  deleteFood: async (id) => {
    const { data } = custumAxios.delete(`restourant/delete/${id}`);
    return data;
  },
};
