import { BackendApiUrl } from "../BackendApiUrl";
import { Page, PageListItem, PagedResult } from "@/types/Models";
import { tryFetchJson } from "../tryFetchJson";

export const pagesApi = {
  keys: {
    list: (page: number, search?: string) => {
      const params = new URLSearchParams();
      params.append("pageNumber", page.toString());
      if (search) params.append("searchTerm", search);
      return `${BackendApiUrl.getPageList}?${params.toString()}`;
    },
    detail: (id: number | string) => {
      if (typeof id === 'number' || !isNaN(Number(id))) {
        return `${BackendApiUrl.getPageById}/${id}`;
      }
      return `${BackendApiUrl.getPageBySlug}/${id}`;
    },
  },

  getList: async (page = 1, search?: string) => {
    return await tryFetchJson<PagedResult<PageListItem>>(pagesApi.keys.list(page, search));
  },

  getByIdOrSlug: async (id: number | string) => {
    return await tryFetchJson<Page>(pagesApi.keys.detail(id));
  },
};
