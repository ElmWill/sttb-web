import useSWR from "swr";
import { useState, useCallback } from "react";
import { useSwrFetcherWithAccessToken } from "@/functions/useSwrFetcherWithAccessToken";
import { useFetchWithAccessToken } from "@/functions/useFetchWithAccessToken";
import { BackendApiUrl, GetAcademicCalendarList } from "@/functions/BackendApiUrl";
import { AcademicCalendarListItem, PagedResult } from "@/types/Models";

export interface UseAcademicCalendarDataReturn {
  data: AcademicCalendarListItem[];
  totalCount: number;
  isLoading: boolean;
  error: unknown;
  actions: {
    onCreate: (data: any) => Promise<boolean>;
    onUpdate: (id: number, data: any) => Promise<boolean>;
    onDelete: (id: number) => Promise<boolean>;
  };
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}

export const useAcademicCalendarData = (page: number, search?: string): UseAcademicCalendarDataReturn => {
  const fetcher = useSwrFetcherWithAccessToken();
  const { fetchPOST, fetchPUT, fetchDELETE } = useFetchWithAccessToken();

  const { data: response, mutate, isLoading, error } = useSWR<PagedResult<AcademicCalendarListItem>>(
    GetAcademicCalendarList(page, search),
    fetcher
  );

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onCreate = useCallback(async (payload: any) => {
    setIsCreating(true);
    try {
      const { error } = await fetchPOST(BackendApiUrl.createAcademicCalendar, payload);
      if (error) throw error;
      mutate();
      return true;
    } catch (err) {
      console.error("Create academic calendar failed", err);
      return false;
    } finally {
      setIsCreating(false);
    }
  }, [fetchPOST, mutate]);

  const onUpdate = useCallback(async (id: number, payload: any) => {
    setIsUpdating(true);
    try {
      const { error } = await fetchPUT(BackendApiUrl.updateAcademicCalendar, { ...payload, academicCalendarId: id });
      if (error) throw error;
      mutate();
      return true;
    } catch (err) {
      console.error("Update academic calendar failed", err);
      return false;
    } finally {
      setIsUpdating(false);
    }
  }, [fetchPUT, mutate]);

  const onDelete = useCallback(async (id: number) => {
    setIsDeleting(true);
    try {
      const { error } = await fetchDELETE(`${BackendApiUrl.deleteAcademicCalendar}/${id}`);
      if (error) throw error;
      mutate();
      return true;
    } catch (err) {
      console.error("Delete academic calendar failed", err);
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [fetchDELETE, mutate]);

  return {
    data: response?.academicCalendars || response?.AcademicCalendars || response?.items || response?.Items || [],
    totalCount: response?.totalCount || response?.TotalCount || 0,
    isLoading,
    error,
    actions: { onCreate, onUpdate, onDelete },
    isCreating,
    isUpdating,
    isDeleting,
  };
};
