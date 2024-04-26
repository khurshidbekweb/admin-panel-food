import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "./QUERY_KEY";
import { TranslateUtils } from "../utils/translate.utils";
import { FoodUtils } from "../utils/food.utils";
import { RestourantUtils } from "../utils/restourant";
import { CategoryUtils } from "../utils/categoryutils";
import { LanguageUtils } from "../utils/language.utils";
import { custumAxios } from "../configs/axios.config";
import { UserUtils } from "../utils/userUtils";

export const ALL_DATA = {
  useLanguage: () => {
    return useQuery({
      queryKey: [QUERY_KEY.language],
      queryFn: LanguageUtils.getLanguage,
    });
  },
  useTranslete: () => {
    return useQuery({
      queryKey: [QUERY_KEY.translete],
      queryFn: TranslateUtils.getTranslate,
    });
  },
  useRestourant: () => {
    return useQuery({
      queryKey: [QUERY_KEY.restourant],
      queryFn: RestourantUtils.getRestourant,
    });
  },
  useFood: () => {
    return useQuery({
      queryKey: [QUERY_KEY.food],
      queryFn: FoodUtils.getFood,
    });
  },
  useCategory: (id) => {
    // if (!id) return [];
    return useQuery({
      queryKey: [QUERY_KEY.category],
      queryFn: async () =>
      await custumAxios.get(`category/find/by/restaurant/${id}`, {
        headers: {
          "accept-language": localStorage.getItem("language"),
        },
      }),
    });
  },
  useCategoryAll: () => {
    return useQuery({
      queryKey: [QUERY_KEY.category],
      queryFn: CategoryUtils.getCategoryAll,
    });
  },
  useUsers: () => {
    return useQuery({
      queryKey: [QUERY_KEY.user],
      queryFn: UserUtils.getUsers,
    });
  },
};
