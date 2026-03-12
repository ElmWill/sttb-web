import useSWR from "swr";
import { useSwrFetcherWithAccessToken } from "@/functions/useSwrFetcherWithAccessToken";
import { postsApi } from "@/functions/api/postsApi";
import { Post, PostListItem, PagedResult } from "@/types/Models";

export const usePostList = (page = 1, search?: string) => {
  const fetcher = useSwrFetcherWithAccessToken();
  const { data, error, isLoading, mutate } = useSWR<PagedResult<PostListItem>>(
    postsApi.keys.list(page, search, "Published"),
    fetcher,
  );

  return {
    posts: data?.posts || data?.Posts || data?.items || data?.Items || [],
    totalCount: data?.totalCount || data?.TotalCount || 0,
    isLoading,
    error,
    mutate,
  };
};

export const usePostDetail = (id: number | string | null) => {
  const fetcher = useSwrFetcherWithAccessToken();
  const { data, error, isLoading, mutate } = useSWR<Post>(
    id ? postsApi.keys.detail(id) : null,
    fetcher,
  );

  return {
    post: data,
    isLoading,
    error,
    mutate,
  };
};
