import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../Query/QUERY_KEY";
import { custumAxios } from "../configs/axios.config";

export const useRestaurant = function () {
  return useQuery({
    queryKey: [QUERY_KEY.restourant],
    queryFn: async () =>
      await custumAxios.get("restourant/find/all", {
        headers: {
          "accept-language": localStorage.getItem("language"),
        },
      }),
  });
};
