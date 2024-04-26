import { custumAxios } from "../configs/axios.config";

export const UserUtils = {
  getUsers: async () => {
    const { data } = await custumAxios("user/find/all", {
      headers: {
        "accept-language": localStorage.getItem("language"),
      },
    });
    return data;
  },
  editUser: async ({ fullName, phoneNumber, password, id }) => {
    const { data } = await custumAxios.patch(`user/edit/${id}`, {
      full_name: fullName,
      phone: phoneNumber,
      password: password,
    });
    return data;
  },
};
