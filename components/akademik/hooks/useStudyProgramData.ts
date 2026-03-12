import useSWR from "swr";
import { useSwrFetcherWithAccessToken } from "@/functions/useSwrFetcherWithAccessToken";
import { studyProgramApi } from "@/functions/api/studyProgramApi";
import { StudyProgram, StudyProgramListItem, PagedResult } from "@/types/Models";
import { GetStudyProgramList } from "@/functions/BackendApiUrl";

export const useStudyProgramList = (degreeLevel?: string) => {
  const fetcher = useSwrFetcherWithAccessToken();
  const { data, error, isLoading, mutate } = useSWR<PagedResult<StudyProgramListItem>>(
    GetStudyProgramList(1, undefined, degreeLevel),
    fetcher
  );

  // Handle various backend response formats, prioritizing 'programs'
  const programs: StudyProgramListItem[] = 
    data?.programs || 
    data?.Programs || 
    data?.items || 
    data?.Items || 
    (Array.isArray(data) ? data : []);

  return {
    programs,
    isLoading,
    error,
    mutate,
  };
};

export const useStudyProgramDetail = (id: string | number) => {
  const fetcher = useSwrFetcherWithAccessToken();
  const { data, error, isLoading, mutate } = useSWR<StudyProgram>(
    id ? studyProgramApi.keys.detail(id) : null,
    fetcher
  );

  return {
    program: data,
    isLoading,
    error,
    mutate,
  };
};
