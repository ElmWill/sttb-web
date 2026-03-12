import useSWR from "swr";
import { useState, useCallback } from "react";
import { useSwrFetcherWithAccessToken } from "@/functions/useSwrFetcherWithAccessToken";
import { useFetchWithAccessToken } from "@/functions/useFetchWithAccessToken";
import { BackendApiUrl, GetPostList } from "@/functions/BackendApiUrl";
import { PostListItem, Post, PagedResult } from "@/types/Models";

export interface UsePostDataReturn {
  data: PostListItem[];
  totalCount: number;
  isLoading: boolean;
  error: unknown;
  actions: {
    onCreate: (data: any) => Promise<boolean>;
    onUpdate: (id: number, data: any) => Promise<boolean>;
    onDelete: (id: number) => Promise<boolean>;
    onPublish: (id: number) => Promise<boolean>;
  };
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}

export const usePostData = (page: number, search?: string): UsePostDataReturn => {
  const fetcher = useSwrFetcherWithAccessToken();
  const { fetchPOST, fetchPUT, fetchDELETE } = useFetchWithAccessToken();

  const { data: response, mutate, isLoading, error } = useSWR<PagedResult<PostListItem>>(
    GetPostList(page, search),
    fetcher
  );

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onCreate = useCallback(async (payload: any) => {
    setIsCreating(true);
    try {
      const { data, error } = await fetchPOST(BackendApiUrl.createPost, payload);
      if (error) throw error;
      mutate();
      return true;
    } catch (err) {
      console.error("Create post failed", err);
      return false;
    } finally {
      setIsCreating(false);
    }
  }, [fetchPOST, mutate]);

  const onUpdate = useCallback(async (id: number, payload: any) => {
    setIsUpdating(true);
    try {
      // The API might expect id in the payload or URL
      const { data, error } = await fetchPUT(BackendApiUrl.updatePost, { ...payload, postId: id });
      if (error) throw error;
      mutate();
      return true;
    } catch (err) {
      console.error("Update post failed", err);
      return false;
    } finally {
      setIsUpdating(false);
    }
  }, [fetchPUT, mutate]);

  const onDelete = useCallback(async (id: number) => {
    setIsDeleting(true);
    try {
      const url = `${BackendApiUrl.deletePost}/${id}`;
      const { data, error } = await fetchDELETE(url);
      if (error) throw error;
      mutate();
      return true;
    } catch (err) {
      console.error("Delete post failed", err);
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [fetchDELETE, mutate]);

  const onPublish = useCallback(async (id: number) => {
    setIsUpdating(true);
    try {
      const url = `${BackendApiUrl.publishPost}/${id}/publish`;
      const { data, error } = await fetchPOST(url);
      if (error) throw error;
      mutate();
      return true;
    } catch (err) {
      console.error("Publish post failed", err);
      return false;
    } finally {
      setIsUpdating(false);
    }
  }, [fetchPOST, mutate]);

  return {
    data: response?.posts || response?.items || [],
    totalCount: response?.totalCount || 0,
    isLoading,
    error,
    actions: { onCreate, onUpdate, onDelete, onPublish },
    isCreating,
    isUpdating,
    isDeleting,
  };
};
