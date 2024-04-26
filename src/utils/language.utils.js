import { custumAxios } from "../configs/axios.config";

export const LanguageUtils = {
  getLanguage: async () => {
    const { data } = await custumAxios.get("language");
    return data;
  },
  addLanguage: async ({ code, title }) => {
    const { data } = await custumAxios.post("language/add", {
      code,
      title,
    });
    return data;
  },
  editLanguage: async (id) => {
    const { data } = await custumAxios.patch(`language/edit/${id}`);
    return data;
  },
  deleteLanguage: async (id) => {
    const { data } = await custumAxios.delete(`language/delete/${id}`);
    return data;
  },
};
