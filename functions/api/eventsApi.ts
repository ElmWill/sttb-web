import { BackendApiUrl } from "../BackendApiUrl";
import { Event, EventListItem, PagedResult } from "@/types/Models";
import { tryFetchJson } from "../tryFetchJson";

export const eventsApi = {
  keys: {
    list: (page: number, search?: string, status?: string) => {
      const params = new URLSearchParams();
      params.append("pageNumber", page.toString());
      if (search) params.append("searchTerm", search);
      if (status) params.append("status", status);
      return `${BackendApiUrl.getEventList}?${params.toString()}`;
    },
    detail: (id: number | string) => {
      if (typeof id === "number") {
        return `${BackendApiUrl.getEventById}/${id}`;
      }
      return `${BackendApiUrl.getEventBySlug}/${id}`;
    },
  },

  getList: async (page = 1, search?: string, status?: string) => {
    return await tryFetchJson<PagedResult<EventListItem>>(
      eventsApi.keys.list(page, search, status)
    );
  },

  getByIdOrSlug: async (id: number | string) => {
    return await tryFetchJson<Event>(eventsApi.keys.detail(id));
  },
};
