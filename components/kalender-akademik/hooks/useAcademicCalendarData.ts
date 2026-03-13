import useSWR from "swr";
import { useSwrFetcherWithAccessToken } from "@/functions/useSwrFetcherWithAccessToken";
import { academicCalendarsApi } from "@/functions/api/academicCalendarsApi";
import { AcademicCalendar, AcademicCalendarListItem, PagedResult } from "@/types/Models";

export const useAcademicCalendarList = (page = 1, search?: string, semester?: string, academicYear?: string) => {
  const fetcher = useSwrFetcherWithAccessToken();
  const { data, error, isLoading, mutate } = useSWR<PagedResult<AcademicCalendarListItem>>(
    academicCalendarsApi.keys.list(page, search, semester, academicYear),
    fetcher,
  );

  return {
    academicCalendars: data?.academicCalendars || data?.AcademicCalendars || data?.items || data?.Items || [],
    totalCount: data?.totalCount || data?.TotalCount || 0,
    isLoading,
    error,
    mutate,
  };
};

export const useAcademicCalendarDetail = (id: number | string | null) => {
  const fetcher = useSwrFetcherWithAccessToken();
  const { data, error, isLoading, mutate } = useSWR<AcademicCalendar>(
    id ? academicCalendarsApi.keys.detail(id) : null,
    fetcher,
  );

  return {
    academicCalendar: data,
    isLoading,
    error,
    mutate,
  };
};
