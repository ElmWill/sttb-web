import useSWR from "swr";
import { useState, useCallback } from "react";
import { useSwrFetcherWithAccessToken } from "@/functions/useSwrFetcherWithAccessToken";
import { useFetchWithAccessToken } from "@/functions/useFetchWithAccessToken";
import { BackendApiUrl, GetStudyProgramList } from "@/functions/BackendApiUrl";
import { StudyProgramListItem, StudyProgram, PagedResult } from "@/types/Models";

export interface UseStudyProgramDataReturn {
  data: StudyProgramListItem[];
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

export const useStudyProgramData = (page: number, search?: string): UseStudyProgramDataReturn => {
  const fetcher = useSwrFetcherWithAccessToken();
  const { fetchPOST, fetchPUT, fetchDELETE } = useFetchWithAccessToken();

  const { data: response, mutate, isLoading, error } = useSWR<PagedResult<StudyProgramListItem>>(
    GetStudyProgramList(page, search),
    fetcher
  );

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onCreate = useCallback(async (payload: any) => {
    setIsCreating(true);
    try {
      const { error } = await fetchPOST(BackendApiUrl.createStudyProgram, payload);
      if (error) throw error;
      mutate();
      return true;
    } catch (err) {
      console.error("Create study program failed", err);
      return false;
    } finally {
      setIsCreating(false);
    }
  }, [fetchPOST, mutate]);

  const onUpdate = useCallback(async (payload: any) => {
    setIsUpdating(true);
    try {
      const { error } = await fetchPUT(BackendApiUrl.updateStudyProgram, payload);
      if (error) throw error;
      mutate();
      return true;
    } catch (err) {
      console.error("Update study program failed", err);
      return false;
    } finally {
      setIsUpdating(false);
    }
  }, [fetchPUT, mutate]);

  const onDelete = useCallback(async (id: number) => {
    setIsDeleting(true);
    try {
      const url = `${BackendApiUrl.deleteStudyProgram}/${id}`;
      const { error } = await fetchDELETE(url);
      if (error) throw error;
      mutate();
      return true;
    } catch (err) {
      console.error("Delete study program failed", err);
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [fetchDELETE, mutate]);

  return {
    data: response?.programs || response?.Programs || response?.items || response?.Items || [],
    totalCount: response?.totalCount || response?.TotalCount || 0,
    isLoading,
    error,
    actions: { onCreate, onUpdate, onDelete },
    isCreating,
    isUpdating,
    isDeleting,
  };
};
