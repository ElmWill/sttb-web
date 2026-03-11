import { BackendApiUrl } from "../BackendApiUrl";
import { Category, PagedResult } from "@/types/Models";
import { tryFetchJson } from "../tryFetchJson";

export const categoriesApi = {
  keys: {
    list: () => BackendApiUrl.getCategoryList,
    detail: (id: number | string) => {
      if (typeof id === 'number') {
        return `${BackendApiUrl.getCategoryById}/${id}`;
      }
      return `${BackendApiUrl.getCategoryBySlug}/${id}`;
    },
  },

  getList: async () => {
    return await tryFetchJson<PagedResult<Category>>(categoriesApi.keys.list());
  },

  getByIdOrSlug: async (id: number | string) => {
    return await tryFetchJson<Category>(categoriesApi.keys.detail(id));
  },
};
