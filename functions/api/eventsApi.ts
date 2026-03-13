import { BackendApiUrl } from "../BackendApiUrl";
import { Event, EventListItem, PagedResult } from "@/types/Models";
import { tryFetchJson } from "../tryFetchJson";

export const eventsApi = {
  keys: {
    list: (page: number, search?: string, status?: string, pageSize?: number, startDateFrom?: string, startDateTo?: string) => {
      const params = new URLSearchParams();
      params.append("pageNumber", page.toString());
      if (pageSize) params.append("pageSize", pageSize.toString());
      if (search) params.append("searchTerm", search);
      if (status) params.append("status", status);
      if (startDateFrom) params.append("startDateFrom", startDateFrom);
      if (startDateTo) params.append("startDateTo", startDateTo);
      return `${BackendApiUrl.getEventList}?${params.toString()}`;
    },
    detail: (id: number | string) => {
      if (typeof id === "number") {
        return `${BackendApiUrl.getEventById}/${id}`;
      }
      return `${BackendApiUrl.getEventBySlug}/${id}`;
    },
  },

  getList: async (page = 1, search?: string, status?: string, pageSize?: number, startDateFrom?: string, startDateTo?: string) => {
    return await tryFetchJson<PagedResult<EventListItem>>(
      eventsApi.keys.list(page, search, status, pageSize, startDateFrom, startDateTo)
    );
  },

  getByIdOrSlug: async (id: number | string) => {
    return await tryFetchJson<Event>(eventsApi.keys.detail(id));
  },
};
