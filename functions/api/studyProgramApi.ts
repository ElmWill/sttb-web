import { BackendApiUrl } from "../BackendApiUrl";
import { StudyProgram, StudyProgramListItem, PagedResult } from "@/types/Models";
import { tryFetchJson } from "../tryFetchJson";

export const studyProgramApi = {
  keys: {
    list: () => BackendApiUrl.getStudyProgramList,
    detail: (id: number | string) => {
      if (typeof id === 'number' || !isNaN(Number(id))) {
        return `${BackendApiUrl.getStudyProgramById}/${id}`;
      }
      return `${BackendApiUrl.getStudyProgramBySlug}/${id}`;
    },
  },

  getList: async () => {
    return await tryFetchJson<PagedResult<StudyProgramListItem>>(studyProgramApi.keys.list());
  },

  getById: async (id: number | string) => {
    return await tryFetchJson<StudyProgram>(studyProgramApi.keys.detail(id));
  },
};
