import { BackendApiUrl } from "../BackendApiUrl";
import { AcademicCalendar, AcademicCalendarListItem, PagedResult } from "@/types/Models";
import { tryFetchJson } from "../tryFetchJson";

export const academicCalendarsApi = {
  keys: {
    list: (page: number, search?: string, semester?: string, academicYear?: string) => {
      const params = new URLSearchParams();
      params.append("pageNumber", page.toString());
      if (search) params.append("searchTerm", search);
      if (semester) params.append("semester", semester);
      if (academicYear) params.append("academicYear", academicYear);
      return `${BackendApiUrl.getAcademicCalendarList}?${params.toString()}`;
    },
    detail: (id: number | string) => {
      if (typeof id === "number") {
        return `${BackendApiUrl.getAcademicCalendarById}/${id}`;
      }
      return `${BackendApiUrl.getAcademicCalendarBySlug}/${id}`;
    },
  },

  getList: async (page = 1, search?: string, semester?: string, academicYear?: string) => {
    return await tryFetchJson<PagedResult<AcademicCalendarListItem>>(
      academicCalendarsApi.keys.list(page, search, semester, academicYear)
    );
  },

  getByIdOrSlug: async (id: number | string) => {
    return await tryFetchJson<AcademicCalendar>(academicCalendarsApi.keys.detail(id));
  },
};
