import useSWR from "swr";
import { useSwrFetcherWithAccessToken } from "@/functions/useSwrFetcherWithAccessToken";
import { eventsApi } from "@/functions/api/eventsApi";
import { Event, EventListItem, PagedResult } from "@/types/Models";

export const useEventList = (page = 1, search?: string, status?: string) => {
  const fetcher = useSwrFetcherWithAccessToken();
  const { data, error, isLoading, mutate } = useSWR<PagedResult<EventListItem>>(
    eventsApi.keys.list(page, search, status),
    fetcher,
  );

  return {
    events: data?.events || data?.Events || data?.items || data?.Items || [],
    totalCount: data?.totalCount || data?.TotalCount || 0,
    isLoading,
    error,
    mutate,
  };
};

export const useEventDetail = (id: number | string | null) => {
  const fetcher = useSwrFetcherWithAccessToken();
  const { data, error, isLoading, mutate } = useSWR<Event>(
    id ? eventsApi.keys.detail(id) : null,
    fetcher,
  );

  return {
    event: data,
    isLoading,
    error,
    mutate,
  };
};
