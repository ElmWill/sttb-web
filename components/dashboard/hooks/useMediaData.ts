import useSWR from "swr";
import { useState, useCallback } from "react";
import { useSwrFetcherWithAccessToken } from "@/functions/useSwrFetcherWithAccessToken";
import { useFetchWithAccessToken } from "@/functions/useFetchWithAccessToken";
import { BackendApiUrl, GetMediaList } from "@/functions/BackendApiUrl";
import { Media, PagedResult } from "@/types/Models";
import { useAuth } from "@/contexts/AuthContext";

export interface UseMediaDataReturn {
  data: Media[];
  totalCount: number;
  isLoading: boolean;
  error: unknown;
  actions: {
    onUpload: (file: File, uploadedBy: number) => Promise<boolean>;
    onDelete: (id: number) => Promise<boolean>;
  };
  isUploading: boolean;
  isDeleting: boolean;
}

export const useMediaData = (page: number, search?: string): UseMediaDataReturn => {
  const fetcher = useSwrFetcherWithAccessToken();
  const { fetchDELETE } = useFetchWithAccessToken();
  const { user } = useAuth();

  const { data: response, mutate, isLoading, error } = useSWR<PagedResult<Media>>(
    GetMediaList(page, search),
    fetcher
  );

  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onUpload = useCallback(async (file: File, uploadedBy: number) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("uploadedBy", uploadedBy.toString());

      // useFetchWithAccessToken might not handle FormData automatically if it sets Content-Type to application/json
      // We might need to use a raw fetch or verify how useFetchWithAccessToken handles it.
      // Looking at useFetchWithAccessToken.ts (earlier viewed), it usually JSON.stringifies the body.
      
      const token = user?.token;
      const res = await fetch(BackendApiUrl.uploadMedia, {
        method: "POST",
        headers: token ? { "Authorization": `Bearer ${token}` } : {},
        body: formData
      });

      if (!res.ok) throw new Error("Upload failed");
      
      mutate();
      return true;
    } catch (err) {
      console.error("Upload media failed", err);
      return false;
    } finally {
      setIsUploading(false);
    }
  }, [mutate, user]);

  const onDelete = useCallback(async (id: number) => {
    setIsDeleting(true);
    try {
      const url = `${BackendApiUrl.deleteMedia}/${id}`;
      const { error } = await fetchDELETE(url);
      if (error) throw error;
      mutate();
      return true;
    } catch (err) {
      console.error("Delete media failed", err);
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [fetchDELETE, mutate]);

  return {
    data: response?.media || (response as any)?.Media || [],
    totalCount: response?.totalCount || (response as any)?.TotalCount || 0,
    isLoading,
    error,
    actions: { onUpload, onDelete },
    isUploading,
    isDeleting,
  };
};
