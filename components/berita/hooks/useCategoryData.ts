import useSWR from "swr";
import { useSwrFetcherWithAccessToken } from "@/functions/useSwrFetcherWithAccessToken";
import { categoriesApi } from "@/functions/api/categoriesApi";
import { Category, PagedResult } from "@/types/Models";

export const useCategoryList = () => {
  const fetcher = useSwrFetcherWithAccessToken();
  const { data, error, isLoading, mutate } = useSWR<PagedResult<Category>>(
    categoriesApi.keys.list(),
    fetcher
  );

  return {
    categories: data?.items || (Array.isArray(data) ? data : []),
    isLoading,
    error,
    mutate,
  };
};

export const useCategoryDetail = (id: number | string | null) => {
  const fetcher = useSwrFetcherWithAccessToken();
  const { data, error, isLoading, mutate } = useSWR<Category>(
    id ? categoriesApi.keys.detail(id) : null,
    fetcher
  );

  return {
    category: data,
    isLoading,
    error,
    mutate,
  };
};
