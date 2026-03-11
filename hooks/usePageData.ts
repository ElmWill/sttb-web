import useSWR from "swr";
import { useSwrFetcherWithAccessToken } from "@/functions/useSwrFetcherWithAccessToken";
import { pagesApi } from "@/functions/api/pagesApi";
import { Page, PageListItem, PagedResult } from "@/types/Models";

export const usePageList = (page = 1, search?: string) => {
  const fetcher = useSwrFetcherWithAccessToken();
  const { data, error, isLoading, mutate } = useSWR<PagedResult<PageListItem>>(
    pagesApi.keys.list(page, search),
    fetcher
  );

  return {
    pages: data?.pages || data?.Pages || data?.items || data?.Items || [],
    totalCount: data?.totalCount || data?.TotalCount || 0,
    isLoading,
    error,
    mutate,
  };
};

export const usePageDetail = (id: number | string | null) => {
  const fetcher = useSwrFetcherWithAccessToken();
  const { data, error, isLoading, mutate } = useSWR<Page>(
    id ? pagesApi.keys.detail(id) : null,
    fetcher
  );

  return {
    page: data,
    isLoading,
    error,
    mutate,
  };
};
