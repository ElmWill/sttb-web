import useSWR from "swr";
import { useState, useCallback } from "react";
import { useSwrFetcherWithAccessToken } from "@/functions/useSwrFetcherWithAccessToken";
import { useFetchWithAccessToken } from "@/functions/useFetchWithAccessToken";
import { BackendApiUrl, GetCourseList } from "@/functions/BackendApiUrl";
import { CourseListItem, PagedResult } from "@/types/Models";

export interface UseCourseDataReturn {
  data: CourseListItem[];
  totalCount: number;
  isLoading: boolean;
  error: unknown;
  actions: {
    onCreate: (data: any) => Promise<boolean>;
    onUpdate: (data: any) => Promise<boolean>;
    onDelete: (id: number) => Promise<boolean>;
  };
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}

export const useCourseData = (page: number, search?: string): UseCourseDataReturn => {
  const fetcher = useSwrFetcherWithAccessToken();
  const { fetchPOST, fetchPUT, fetchDELETE } = useFetchWithAccessToken();

  const { data: response, mutate, isLoading, error } = useSWR<PagedResult<CourseListItem>>(
    GetCourseList(page, search),
    fetcher
  );

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onCreate = useCallback(async (payload: any) => {
    setIsCreating(true);
    try {
      const { error } = await fetchPOST(BackendApiUrl.createCourse, payload);
      if (error) throw error;
      mutate();
      return true;
    } catch (err) {
      console.error("Create course failed", err);
      return false;
    } finally {
      setIsCreating(false);
    }
  }, [fetchPOST, mutate]);

  const onUpdate = useCallback(async (payload: any) => {
    setIsUpdating(true);
    try {
      const { error } = await fetchPUT(BackendApiUrl.updateCourse, payload);
      if (error) throw error;
      mutate();
      return true;
    } catch (err) {
      console.error("Update course failed", err);
      return false;
    } finally {
      setIsUpdating(false);
    }
  }, [fetchPUT, mutate]);

  const onDelete = useCallback(async (id: number) => {
    setIsDeleting(true);
    try {
      const url = `${BackendApiUrl.deleteCourse}/${id}`;
      const { error } = await fetchDELETE(url);
      if (error) throw error;
      mutate();
      return true;
    } catch (err) {
      console.error("Delete course failed", err);
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [fetchDELETE, mutate]);

  return {
    data: response?.courses || response?.items || [],
    totalCount: response?.totalCount || 0,
    isLoading,
    error,
    actions: { onCreate, onUpdate, onDelete },
    isCreating,
    isUpdating,
    isDeleting,
  };
};
